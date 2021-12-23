import { BadRequestException } from "@nestjs/common";


export class Utils {


    getCurrentDate(): string {

        let currentDate = new Date();
        let date = this.getFillNumber(currentDate.getDate())
        let month = this.getFillNumber((currentDate.getMonth() + 1))
        let year = currentDate.getFullYear();
        let hours = this.getFillNumber(currentDate.getHours());
        let minutes = this.getFillNumber(currentDate.getMinutes())
        let seconds = this.getFillNumber(currentDate.getSeconds())

        return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`

    }

    getFillNumber(number: Number) {
        return `0${number}`.slice(-2)
    }


    validName(name: string) {

        let currentName = name.toUpperCase()
        currentName = name.replace(/\s+/g, " ")

        //special caracteres
        if (this.validateUser(/[!@#$%^&*(),.?":{}|<>]/g, currentName)) {
            throw new BadRequestException('O nome não pode conter caracteres especiais!!')
        }

        return currentName
    }

    private validateUser(regex: RegExp, value: string): boolean {
        return regex.test(value)
    }

}