
interface Course {
    name: string
    duration?: Number
    educator: string
}

class CreateCourseService {
    execute({ duration = 8, educator, name }: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService()