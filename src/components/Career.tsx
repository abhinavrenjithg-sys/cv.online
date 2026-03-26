import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Foundation</h4>
                <h5>Engineering Fundamentals</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed foundational undergraduate engineering coursework covering core 
              programming principles, mathematics, and engineering fundamentals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineering Intern</h4>
                <h5>Uplyx Solutions</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed and tested ML models using real-world datasets. Performed 
              comprehensive data preprocessing, feature engineering, and model evaluation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA – AI & ML (IBM)</h4>
                <h5>Lovely Professional University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Specializing in Artificial Intelligence and Machine Learning under LPU's 
              IBM-integrated curriculum. Focus on neural networks and data science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
