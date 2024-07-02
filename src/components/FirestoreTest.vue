<template>
    <div>
      <h1>Firestore Connection Test</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="error">Error: {{ error }}</div>
        <div v-else>
          <ul>
            <li v-for="student in students" :key="student.id">{{ student.name }} - {{ student.Class }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { collection, getDocs } from 'firebase/firestore'
  import { firestore } from '@/firebase/init'
  
  export default {
    name: 'FirestoreTest',
    setup() {
      const students = ref([])
      const loading = ref(true)
      const error = ref(null)
  
      const fetchStudents = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'student'))
          console.log('Firestore initialized:', firestore)
          console.log('Student:', querySnapshot.docs.map(doc => doc.data()))
          students.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } catch (err) {
          error.value = err.message
        } finally {
          loading.value = false
        }
      }
  
      fetchStudents()
  
      return {
        students,
        loading,
        error
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any required styles here */
  </style>
  