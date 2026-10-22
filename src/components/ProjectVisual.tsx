import { ArrowDownToLine, BookOpen, Bot, Link2, Search, ShoppingBag, Sparkles } from "lucide-react";
import type { Project } from "../data";

function BrowserBar({ domain }: { domain: string }) {
  return (
    <div className="mock-browser-bar">
      <div className="mock-dots"><i /><i /><i /></div>
      <span>{domain}</span>
      <i className="mock-secure" />
    </div>
  );
}

export default function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "store") {
    return (
      <div className="project-visual store-visual" aria-hidden="true">
        <div className="mock-window store-window">
          <BrowserBar domain="vncompany.store" />
          <div className="store-nav"><b>VN.</b><span>Shop&nbsp;&nbsp; Collections&nbsp;&nbsp; About</span><ShoppingBag size={13} /></div>
          <div className="store-hero">
            <div><small>CURATED OBJECTS</small><strong>Everyday,<br />elevated.</strong><i>Explore collection →</i></div>
            <div className="store-product-main"><span className="product-bag" /></div>
          </div>
          <div className="store-products">
            <div><span className="product-bottle" /><small>ESSENTIAL 01</small></div>
            <div><span className="product-speaker" /><small>ESSENTIAL 02</small></div>
            <div><span className="product-clock" /><small>ESSENTIAL 03</small></div>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "calculator") {
    return (
      <div className="project-visual calculator-visual" aria-hidden="true">
        <div className="calculator-orbit orbit-one" />
        <div className="calculator-orbit orbit-two" />
        <div className="mock-window calculator-window">
          <BrowserBar domain="rice calculator / cambodia" />
          <div className="calculator-app">
            <div className="calculator-title"><span>RC</span><small>RICE CALCULATOR</small></div>
            <div className="calculator-display"><small>CALCULATION</small><strong>0.00</strong><span>Ready to calculate</span></div>
            <div className="calculator-fields"><span>Enter value</span><span>Select unit</span></div>
            <div className="calculator-button">CALCULATE <span>→</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "bookshelf") {
    return (
      <div className="project-visual bookshelf-visual" aria-hidden="true">
        <div className="bookshelf-heading"><span>MY<br />BOOKSHELF</span><BookOpen size={28} strokeWidth={1.2} /></div>
        <div className="book-stage">
          <div className="book book-one"><small>KHMER</small><b>01</b><span>COLLECTION</span></div>
          <div className="book book-two"><small>DESIGN</small><b>02</b><span>LIBRARY</span></div>
          <div className="book book-three"><small>CODE</small><b>03</b><span>ARCHIVE</span></div>
          <div className="book-shadow" />
        </div>
        <div className="bookshelf-footer"><span>YOUR DIGITAL LIBRARY</span><Search size={14} /></div>
      </div>
    );
  }

  if (project.visual === "ai") {
    return (
      <div className="project-visual ai-visual" aria-hidden="true">
        <div className="ai-grid" />
        <div className="ai-top"><span><Bot size={15} /> AI ASSISTANT</span><i>ON TELEGRAM</i></div>
        <div className="chat-stream">
          <div className="chat-message user-message">Can you help me with this?</div>
          <div className="chat-row"><div className="bot-avatar"><Sparkles size={16} /></div><div className="chat-message bot-message">Absolutely. Send me the details and I’ll take it from there.</div></div>
          <div className="chat-message user-message short-message">Here’s the file.</div>
        </div>
        <div className="chat-compose"><span>Message...</span><b>↑</b></div>
      </div>
    );
  }

  return (
    <div className="project-visual download-visual" aria-hidden="true">
      <div className="download-rings"><i /><i /><i /></div>
      <div className="download-card">
        <div className="download-icon"><ArrowDownToLine size={28} strokeWidth={1.4} /></div>
        <small>TELEGRAM MEDIA UTILITY</small>
        <strong>From link<br />to download.</strong>
        <div className="download-link"><Link2 size={14} /><span>Paste a TikTok link</span><b>→</b></div>
      </div>
    </div>
  );
}
