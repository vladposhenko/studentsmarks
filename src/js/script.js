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
      const button = document.createElement('button')
      img.src = "img/x-circle.svg"
      img.classList.add('delete__student')
      th.classList.add('student__name')
      th.setAttribute("scope", "row")
      th.innerText = s.name
      th.append(img)
      tr.append(th)

      img.addEventListener('click', async () => {
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
   let checkedStudent = await checkStudent(student.value)
   console.log(checkedStudent);
   if(!checkedStudent) {
      await studentsAPI.postStudent(student.value);
      await getStudentsTable()
   } else {
      alert('This student already exist!')
   }
})

async function checkStudent (name) {
   let students = await studentsAPI.getStudents()
   let filteredStudents =  students.some((st) => st.name === name)
   return filteredStudents
}


getStudentsTable()