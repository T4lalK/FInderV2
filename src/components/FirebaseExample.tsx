import { onValue, push, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { db } from '../firebase';
import styles from './FirebaseExample.module.css';

interface Student {
  id: string;
  name: string;
  grade: string;
}

export default function FirebaseExample() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 1. Write data
  async function addStudent() {
    if (!name) {
      return;
    }
    try {
      await push(ref(db, 'students'), { name, grade: 'A+' });
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to write to the database.');
    }
  }

  // 2. Read data, live: onValue keeps `students` in sync with the database
  useEffect(() => {
    const studentsRef = ref(db, 'students');
    const unsubscribe = onValue(
      studentsRef,
      (snapshot) => {
        const data = snapshot.val() as Record<string, Omit<Student, 'id'>> | null;
        const list = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setStudents(list);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className={styles.studentDemo}>
      <div className={styles.studentForm}>
        <label htmlFor="student-name" className={styles.visuallyHidden}>
          Student name
        </label>
        <input
          id="student-name"
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void addStudent();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            void addStudent();
          }}
        >
          Add
        </button>
      </div>

      {error && <p className={styles.studentError}>{error}</p>}

      {students.length === 0 ? (
        <p className={styles.studentEmpty}>No students yet - add one above.</p>
      ) : (
        <ul className={styles.studentList}>
          {students.map((student) => (
            <li key={student.id} className={styles.studentListItem}>
              <span>{student.name}</span>
              <span className={styles.studentGrade}>{student.grade}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
