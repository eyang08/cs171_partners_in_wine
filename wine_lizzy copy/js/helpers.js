
/* * * * * * * * * * * * * *
*      NameConverter       *
* * * * * * * * * * * * * */

class NameConverter {
    constructor() {
        this.countries = [
            ['United States', 'USA'],

        ]
    }

    getAbbreviation(input){
        let that = this
        let output = '';
        that.countries.forEach( country => {
            if (country[0] === input){
                output = country[1]
            }})
        return output
    }

    getFullName(input){
        let that = this
        let output = '';
        that.countries.forEach( country => {
            if (country[1] === input){
                output = country[0]
            }})
        return output
    }
}

let nameConverter = new NameConverter()



