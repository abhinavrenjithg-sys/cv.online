import { useState } from "react";
import "./styles/Certificates.css";
import { MdOpenInNew, MdClose, MdVerified } from "react-icons/md";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  image?: string;
  category: string;
};

const certificates: Certificate[] = [
  // ── Add your certificates here ──
  // Example:
  // {
  //   title: "Machine Learning Specialization",
  //   issuer: "Coursera / DeepLearning.AI",
  //   date: "2024",
  //   category: "AI / ML",
  //   link: "https://coursera.org/verify/...",
  //   credentialId: "ABC123",
  // },
];

const CATEGORIES = ["All", ...Array.from(new Set(certificates.map((c) => c.category)))];

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <div className="cert-section" id="certificates">
      <div className="cert-container section-container">
        {/* Header */}
        <div className="cert-header">
          <h2>
            My <span>Certificates</span>
          </h2>
          {CATEGORIES.length > 1 && (
            <div className="cert-filter">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cert-filter-btn ${activeCategory === cat ? "cert-filter-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor="disable"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="cert-empty">
            <MdVerified className="cert-empty-icon" />
            <p>Certificates coming soon!</p>
            <span>Your achievements will be displayed here.</span>
          </div>
        ) : (
          <div className="cert-grid">
            {filtered.map((cert, i) => (
              <div className="cert-card" key={i}>
                {cert.image && (
                  <button
                    className="cert-card-img-btn"
                    onClick={() => setPreviewImg(cert.image!)}
                    data-cursor="disable"
                  >
                    <img src={cert.image} alt={cert.title} />
                    <div className="cert-card-overlay">🔍 View</div>
                  </button>
                )}
                <div className="cert-card-body">
                  <span className="cert-category-tag">{cert.category}</span>
                  <h4>{cert.title}</h4>
                  <p className="cert-issuer">
                    <MdVerified className="cert-verified-icon" />
                    {cert.issuer}
                  </p>
                  <div className="cert-meta">
                    <span className="cert-date">{cert.date}</span>
                    {cert.credentialId && (
                      <span className="cert-id">ID: {cert.credentialId}</span>
                    )}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-btn"
                      data-cursor="disable"
                    >
                      <MdOpenInNew /> Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="cert-modal-overlay"
          onClick={() => setPreviewImg(null)}
          data-cursor="disable"
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={previewImg} alt="Certificate Preview" />
            <button
              className="cert-modal-close"
              onClick={() => setPreviewImg(null)}
              data-cursor="disable"
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
