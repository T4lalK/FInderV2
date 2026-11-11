import styles from './App.module.css'; // Test
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import FirebaseExample from './components/FirebaseExample';

function App() {
  return (
    <>
      <section className={styles.center}>
        <div className={styles.hero}>
          <img src={heroImg} className={styles.base} width="170" height="179" alt="" />
          <img src={reactLogo} className={styles.framework} alt="React logo" />
          <img src={viteLogo} className={styles.vite} alt="Vite logo" />
        </div>
        <div>
          <h1>React + Vite + Firebase</h1>
          <p>
            A starter template wiring up <code>React</code> and{' '}
            <code>Firebase Realtime Database</code>, served with <code>Vite</code> for
            instant HMR.
          </p>
        </div>

        <div className={styles.demoCard}>
          <p className={styles.demoHint}>
            Follow the <strong>Firebase Setup</strong> guide under{' '}
            <strong>Project</strong> on the course website to connect your own Firebase
            project. Once connected, add a name below - it&apos;s written to your Realtime
            Database under <code>students</code> and streamed back live with{' '}
            <code>src/components/FirebaseExample.tsx</code>.
          </p>
          <FirebaseExample />
        </div>
      </section>

      <div className={styles.ticks} />

      <section className={styles.nextSteps}>
        <div className={styles.docs}>
          <svg className={styles.icon} role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon" />
          </svg>
          <h2>Documentation</h2>
          <p>Read up on the stack this starter is built on</p>
          <ul>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className={styles.logo} src={reactLogo} alt="" />
                React
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className={styles.logo} src={viteLogo} alt="" />
                Vite
              </a>
            </li>
            <li>
              <a
                href="https://firebase.google.com/docs/database"
                target="_blank"
                rel="noreferrer"
              >
                <svg className={styles.buttonIcon} role="presentation" aria-hidden="true">
                  <use href="/icons.svg#firebase-icon" />
                </svg>
                Firebase
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.social}>
          <svg className={styles.icon} role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon" />
          </svg>
          <h2>Source code</h2>
          <p>See how each part of the stack is built</p>
          <ul>
            <li>
              <a
                href="https://github.com/facebook/react"
                target="_blank"
                rel="noreferrer"
              >
                <img className={styles.buttonIcon} src={reactLogo} alt="" />
                React
              </a>
            </li>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <img className={styles.buttonIcon} src={viteLogo} alt="" />
                Vite
              </a>
            </li>
            <li>
              <a
                href="https://github.com/firebase/firebase-js-sdk"
                target="_blank"
                rel="noreferrer"
              >
                <svg className={styles.buttonIcon} role="presentation" aria-hidden="true">
                  <use href="/icons.svg#firebase-icon" />
                </svg>
                Firebase SDK
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className={styles.ticks} />
      <section className={styles.spacer} />
    </>
  );
}

export default App;
