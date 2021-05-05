import {Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCourse(request: Request, response: Response) {

    CreateCourseService.execute({
        name:"NodeJS", 
        duration: 12,
        educator: "Batman",
    })

    CreateCourseService.execute({
        name:"Serverless", 
        educator: "Batman",
    })

    return response.send()
}