import { useState } from "react";
import ResultsWheel from "../components/ResultsWheel"
import { ScreenName } from "./ScreenProps";

interface ResultsScreenProps {
  nextScreen: (next: ScreenName) => void;
  retake: () => void;
  sections: string[];
  colors: string[];
  answers: number[][];
  aspect: number;
}

function ResultsScreen(props: ResultsScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [over18, setOver18] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [confirmation, setConfirmation] = useState(<span></span>)
  const [imageData, setImageData] = useState("")

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    if (name.trim() === "") {
      setConfirmation(<span style={{
        color: "red"
      }}>No name was provided</span>)
    } else if (!emailPattern.test(email)) {
      setConfirmation(<span style={{
        color: "red"
      }}>A valid email was not provided</span>)
    } else if (!agreedPrivacy || !over18) {
      setConfirmation(<span style={{
        color: "red"
      }}>Must be over 18 and have agreed to the privacy policy</span>)
    } else {

      setConfirmation(<span>Sending email. This may take a few minutes. Keep this page open to ensure the email is sent.</span>)

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          img_string: imageData.slice(22)
        })
      }

      fetch("https://api-server-rz88.onrender.com", requestOptions).then(response => {
        if (!response.ok) {
          setConfirmation(<span style={{
            color: "red"
          }}>There was an error in the server. Please contact the website creator.</span>)
        } else {
          setConfirmation(<span style={{
            color: "green"
          }}>Email sent successfully. The email may take a few minutes to arrive. If you cannot see it, ensure you have checked your spam.</span>)
        }
      })
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "100vw",
    }}>
      <div className='title-div'>
        <h1><b>Your results</b></h1>
      </div>
      <div className='chart-div'>
        <ResultsWheel
          sections={props.sections}
          colors={props.colors}
          answers={props.answers}
          aspect={props.aspect}
          base64Image={imageData}
          setBase64Image={setImageData}
        />
      </div>
      <div style={{
        width: "70vw",
      }}>
        <h2><b>Develop continuously</b></h2>
        <p>Register today and have your results delivered straight to your email.<br />You'll also gain access to the Vitality Clinic newsletter, packed with valuable tips, exciting projects, and practical exercises to keep you motivated and help you work toward your best life.<br />But that's not all! As a subscriber, you'll receive an exclusive offer to book your first 60-minute psychological vitality consultation with me at 50% off the regular price. This session will help you identify your goals and the barriers holding you back from a more fulfilling life.<br />And don't worry- you can unsubscribe at any time.</p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
        flexDirection: "column",
        width: "70vw",
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "left",
            flexDirection: "column",
            width: "100%"
          }}>
          <div>
            <label>Your name:&nbsp;&nbsp;</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your email:&nbsp;&nbsp;</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>I am 18 or above</label>
            <input
              type="checkbox"
              checked={over18}
              onChange={e => setOver18(e.target.checked)}
            />
          </div>
          <div>
            <label>I agree to the privacy policy</label>
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={e => setAgreedPrivacy(e.target.checked)}
            />
          </div>
          <div>
            <input type="submit" value={"Sign Up"} style={{
              border: "2px solid",
              textDecoration: "none",
              cursor: "pointer",
              width: "7em",
              height: "2em",
              marginTop: "10px"
            }} />
            <p>{confirmation}</p>
          </div>
        </form>
      </div>

      <div className="retake-div">
        <button
          className="start-button"
          onClick={props.retake}
        >Retake Quiz</button>
      </div>
    </div>
  )
}

export default ResultsScreen
