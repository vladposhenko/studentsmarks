import { studentsAPI } from "./api.js";

const student = document.getElementById('newStudent')
const studentForm = document.getElementById('studentForm')

const tableBody = document.getElementById('tableBody')
const getStudentsTable = async () => {
   tableBody.innerHTML = "";
   let students = await studentsAPI.getStudents()
   students.forEach((s) => {
      const tr = document.createElement('tr')
      const th = document.createElement('th')
      const img = document.createElement('img')
      img.src = "img/x-circle.svg"
      img.style.marginLeft = '20px'
      img.style.cursor = 'pointer'
      th.setAttribute("scope", "row")
      th.innerHTML = s.name
      th.append(img)
      tr.append(th)

      img.addEventListener('click',async () => {
         await studentsAPI.deleteStudent(s.id)
         await getStudentsTable()
      })
      for(let i = 0; i < s.marks.length; i++) {
         const td = document.createElement('td')
         const input = document.createElement('input')
         input.setAttribute('data-id', 'markInput')
         input.addEventListener('change',  () => {
            const { marks, id } = s
            marks[i] = input.value
            console.log(marks);
            studentsAPI.updateStudentMark(marks, id)
         })
         input.value = `${s.marks[i]}`
         td.append(input)
         tr.append(td)
      }
      tableBody.append(tr)
   })
}

studentForm.addEventListener('submit', async (e) => {
   e.preventDefault()
   await studentsAPI.postStudent(student.value);
   await getStudentsTable()
   // const tr = document.createElement('tr')
   // const th = document.createElement('th')
   // th.innerHTML = student.value
   // th.setAttribute("scope", "row")
   // tr.append(th)
   // tableBody.append(tr)
})


getStudentsTable()