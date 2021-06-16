import chromiun from 'chrome-aws-lambda'
import handlebars from 'handlebars'
import path from "path"
import fs from "fs"
import dayjs from 'dayjs'
import { S3 } from 'aws-sdk'

import { document } from '../utils/dynamodbClient'

interface ICreateCertificate {
    id: string;
    name: string;
    grade: string;
}

interface ITemplate {
    id: string;
    name: string;
    grade: string;
    date: string;
    medal: string;
}

const compile = async function( data: ITemplate) {
    const filePath = path.join(process.cwd(), "src", "templates", "certificate.hbs")

    const html = fs.readFileSync(filePath, "utf-8")

    return handlebars.compile(html)(data)
}

export const handle = async (event) => {
    // recive id, name, grade
    const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

    const response = await document.query({
        TableName: 'users_certificates',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise()

    const userAlreadyExists = response.Items[0]

    if (!userAlreadyExists) {
        await document.put({
            TableName: "users_certificates",
            Item: {
                id,
                name,
                grade
            }
        }).promise()
    }

    const medalPath = path.join(process.cwd(), "src", "templates", "selo.png")
    const medal = fs.readFileSync(medalPath, "base64")

    const data: ITemplate = {
        date: dayjs().format("DD/MM/YYYY"),
        grade,
        name,
        id,
        medal
    }

    // gera o certificado a partir do template em html
    const content = await compile(data)

    // transformar html em PDF

    const browser = await chromiun.puppeteer.launch({
        args: chromiun.args,
        defaultViewport: chromiun.defaultViewport,
        executablePath: await chromiun.executablePath,
        headless: true,
    })

    const page = await browser.newPage()

    await page.setContent(content)

    const pdf = await page.pdf({
        format: "a4",
        landscape: true,
        path: process.env.IS_OFFLINE ? "certificate.pdf" : null,
        printBackground: true,
        preferCSSPageSize: true
    })

    await browser.close()

    const s3 = new S3()

    await s3.putObject({
        Bucket: "ignite-certificate-pdf",
        Key: `${id}.pdf`,
        ACL: 'public-read',
        Body: pdf,
        // precisa ter content type para gerar o pdf
        ContentType: "application/pdf"
    }).promise()


    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Certificate created",
            url: `https://ignite-certificate-pdf.s3.sa-east-1.amazonaws.com/${id}.pdf`
        }),
        headers: {
            "Content-Type": "application/json"
        },
    }
}