import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdOpenInNew, MdClose, MdGridView, MdStar } from "react-icons/md";

type Project = {
  title: string;
  category: string;
  tools: string;
  link?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "ThreatWatch",
    category: "Next-Gen Cybersecurity",
    tools: "AI Threat Detection, Continuous Monitoring, Automated Incident Response",
    link: "https://grand-mooncake-a2f6d7.netlify.app/",
    image: "/images/threatwatch_dashboard.png",
    featured: true,
  },
  {
    title: "ArchAI",
    category: "Smart Architecture & Interior Design",
    tools: "AI/ML, 3D Rendering, Budget Analysis, Construction Planning",
    link: "https://ai.studio/apps/e1b78a68-11c9-4e60-945c-a96dd16878a5?fullscreenApplet=true",
    images: ["/images/archai_1.png", "/images/archai_2.png"],
    featured: true,
  },
  {
    title: "Stock Market Prediction",
    category: "Finance AI",
    tools: "ANN, Python, yFinance",
    image: "/images/stock_prediction.png",
    featured: true,
  },
  {
    title: "House Price Prediction",
    category: "Real Estate ML",
    tools: "Regression, EDA, Scikit-learn",
    image: "/images/house_prediction.png",
    featured: true,
  },
  {
    title: "Glanzee.ai",
    category: "Conversational AI Platform",
    tools: "Gemini 2.5 Flash, Multimodal Reasoning, Voice Interaction, Image Generation",
    link: "https://ai.studio/apps/2aab296c-0e76-4fb3-b23a-ca90bb03f840?fullscreenApplet=true",
    image: "/images/glanzee_main.png",
    featured: true,
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured");

  const getMainImage = (project: Project) =>
    project.images ? project.images[0] : project.image;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const openModal = useCallback((img: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(img);
  }, []);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        {/* Header */}
        <div className="work-header">
          <h2>My <span>Work</span></h2>
          <div className="work-tabs">
            <button
              className={`work-tab ${activeTab === "featured" ? "work-tab-active" : ""}`}
              onClick={() => setActiveTab("featured")}
              data-cursor="disable"
            >
              <MdStar /> Top Projects
            </button>
            <button
              className={`work-tab ${activeTab === "all" ? "work-tab-active" : ""}`}
              onClick={() => setActiveTab("all")}
              data-cursor="disable"
            >
              <MdGridView /> All Projects
            </button>
          </div>
        </div>

        {/* ── FEATURED CAROUSEL VIEW ── */}
        {activeTab === "featured" && (
          <div className="carousel-wrapper">
            <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev} aria-label="Previous" data-cursor="disable">
              <MdArrowBack />
            </button>
            <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next" data-cursor="disable">
              <MdArrowForward />
            </button>

            <div className="carousel-track-container">
              <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {projects.map((project, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="carousel-content">
                      <div className="carousel-info">
                        <div className="carousel-number">
                          <h3>0{index + 1}</h3>
                        </div>
                        <div className="carousel-details">
                          <h4>{project.title}</h4>
                          <p className="carousel-category">{project.category}</p>
                          <div className="carousel-tools">
                            <span className="tools-label">Tools & Features</span>
                            <div className="tools-tags">
                              {project.tools.split(",").map((tool, i) => (
                                <span key={i} className="tool-tag">{tool.trim()}</span>
                              ))}
                            </div>
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="live-demo-btn"
                              data-cursor="disable"
                            >
                              <MdOpenInNew /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Image area */}
                      <div className="carousel-image-wrapper">
                        {project.images ? (
                          <div className="multi-image-grid">
                            {project.images.map((img, i) => (
                              <button
                                key={i}
                                className={`multi-img-btn ${i === 0 ? "multi-img-main" : ""}`}
                                onClick={(e) => openModal(img, e)}
                                data-cursor="disable"
                              >
                                <img src={img} alt={`${project.title} view ${i + 1}`} />
                                <div className="img-zoom-hint">🔍 Click to expand</div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <button
                            className="single-img-btn"
                            onClick={(e) => openModal(project.image!, e)}
                            data-cursor="disable"
                          >
                            <img src={project.image} alt={project.title} />
                            <div className="img-zoom-hint">🔍 Click to expand</div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>
          </div>
        )}

        {/* ── ALL PROJECTS GRID VIEW ── */}
        {activeTab === "all" && (
          <div className="all-projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <button
                  className="project-card-img-btn"
                  onClick={(e) => openModal(getMainImage(project)!, e)}
                  data-cursor="disable"
                >
                  <img
                    src={getMainImage(project) || "/images/placeholder.webp"}
                    alt={project.title}
                  />
                  <div className="project-card-overlay">
                    <span>🔍 View</span>
                  </div>
                </button>
                <div className="project-card-info">
                  <div className="project-card-header">
                    <span className="project-card-num">0{index + 1}</span>
                    <h4>{project.title}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                        data-cursor="disable"
                        title="Open Live Demo"
                      >
                        <MdOpenInNew />
                      </a>
                    )}
                  </div>
                  <p className="project-card-category">{project.category}</p>
                  <div className="project-card-tags">
                    {project.tools.split(",").slice(0, 3).map((tool, i) => (
                      <span key={i} className="tool-tag">{tool.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── IMAGE ZOOM MODAL ── */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeModal} data-cursor="disable">
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Project Preview" />
            <button className="image-modal-close" onClick={closeModal} data-cursor="disable">
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
