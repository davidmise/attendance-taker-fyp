import { ref, get } from 'firebase/database'
import {  setDoc, doc } from 'firebase/firestore'
import { database, firestore } from '@/firebase/init'
// import {  firestore } from '@/firebase/init'
async function migrateData() {
  // Reference to the 'students' node in Realtime Database
  const studentsRef = ref(database, 'student/student1')

  try {
    // Fetch all students from Realtime Database
    const snapshot = await get(studentsRef)
    if (snapshot.exists()) {
      const students = snapshot.val()

      // Iterate over each student and write to Firestore
      for (const studentId in students) {
        const student = students[studentId]

        // Prepare the Firestore reference
        const firestoreRef = doc(firestore, 'student', studentId)

        // Write data to Firestore
        await setDoc(firestoreRef, student)

        console.log(`Migrated student with ID: ${studentId}`)
      }

      console.log('Migration completed successfully')
    } else {
      console.log('No data found in Realtime Database')
    }
  } catch (error) {
    console.error('Error migrating data:', error)
  }
}

// Call the migration function
migrateData()
