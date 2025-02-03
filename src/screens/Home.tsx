import { ScreenName } from "./ScreenProps";

interface HomeScreenProps {
  nextScreen: (next: ScreenName) => void;
}

function HomeScreen(props: HomeScreenProps) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "left",
      flexDirection: "column",
      width: "100vw",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: "5vw",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          flexDirection: "column",
        }}>
          <h1>The <b>Wheel of Vitality</b></h1>
          <p>An interactive assessment designed to self-evaluate your commitment to achieving optimal functioning and well-being in crucial areas of life.</p>
          <button
            onClick={() => props.nextScreen("questions")}
            className='start-button'
          >Get Started</button>
        </div>

        <figure style={{
          textAlign: 'center',
        }}>
          <img src="example-chart.png" style={{
            height: "40vw"
          }} />
          <figcaption
            style={{
              fontStyle: 'italic',
              marginTop: "10px",
            }}
          >An example wheel</figcaption>
        </figure>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        margin: "8vw",
      }}>
        <h2><b>What is the Wheel of Vitality?</b></h2>
        <p>The Wheel of Vitality is a simple yet powerful tool I designed to provide a clear visual representation of all the key areas that contribute to vitality.<br />It emphasises your values, effort, and commitment to actions that foster vitality, rather than focusing on circumstances beyond your control.<br />During the assessment, you will rate how satisfied you currently are with your actions in the following areas:</p>
        <ol type="I">
          <li>Mental health and stress management</li>
          <li>Relationships/connections</li>
          <li>Nutrition</li>
          <li>Exercise</li>
          <li>Sleep</li>
          <li>Work/education/passions</li>
          <li>Health</li>
          <li>Spirituality/philosophy of life (optional)</li>
        </ol>
        <p>If your results are closer to 1, this area needs more of your focus. <br />If they are approaching 10, you have probably done everything within your power in this area.</p>
        <h2><b>Who is behind this?</b></h2>
        <p>
          I created this tool after more than 25 years of working as a psychologist and helping people to improve their lives.<br />I regularly use the Wheel of Vitality in therapy to give my clients a visual overview of what contributes to their feeling of well-being and full aliveness, or the lack thereof.<br />You will find full information about me and my practice on my website: <a href="https://psychologybirmingham.com/">psychologybirmingham.com</a>
        </p>
        <h2><b>How to complete the assessment?</b></h2>
        <p>
          This online assessment is simple and easy to complete, typically taking just a few minutes. To get started, simply click the button. The interactive system will guide you through 28 questions, allowing you to rate different areas of your life.<br />Once you've finished, your results will be displayed in a clear, visual format.
        </p>
        <h2><b>How much does it cost?</b></h2>
        <p>
          My Wheel of Vitality assessment is completely free. If you'd like to receive your results via email, I'll ask your permission to subscribe to my occasional newsletter. Register and have your results delivered straight to your mailbox.<br />You'll also gain access to the Vitality Clinic newsletter, packed with valuable tips, exciting projects, and practical exercises to keep you motivated and help you work toward your best life.<br />But that's not all! As a subscriber, you'll receive an exclusive offer to book your first 60-minute psychological vitality consultation with me at 50% off the regular price. This session will help you identify your goals and overcome the barriers holding you back from a more fulfilling life. And on't worry- You can unsubscribe at any time.
        </p>

        <button
          onClick={() => props.nextScreen("questions")}
          className='start-button2'
        >Start the assessment</button>
      </div>
    </div >
  )
}

export default HomeScreen
