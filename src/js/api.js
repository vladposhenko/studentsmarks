const baseUrl = 'https://632874ac9a053ff9aab866a5.mockapi.io/'

export const studentsAPI = {
    async getStudents () {
        let request = await fetch(baseUrl + 'students')
        let response = await request.json()
        return response
    },
    async updateStudentMark (marks, id) {
        await fetch(baseUrl + 'students/' + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify({marks})
        }) 
    },
    async postStudent (student) {
        await fetch(baseUrl + 'students', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify({
                name: student,
                marks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                email: 'lalal@gmail.com',
                id: Math.floor(Math.random() * 100)
            })
        })
    },

    async deleteStudent (id) {
        await fetch( baseUrl + 'students/' + id , {
            method: 'DELETE'
        })
    }
}