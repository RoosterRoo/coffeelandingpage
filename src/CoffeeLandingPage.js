import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CoffeeLandingPage = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;

      // Ensure metadata is loaded so we have the duration
      video.onloadedmetadata = () => {
        gsap.to(video, {
          currentTime: video.duration, // Move video to the end
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom', // Total scroll distance
            scrub: 1, // Smoothness of the scrub (higher = more lag/smoothness)
          },
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} style={styles.pageContainer}>
      {/* Background Video Layer */}
      <div style={styles.videoWrapper}>
        <video
          ref={videoRef}
          src="output-fast-scrub.mp4"
          type="video/mp4"
          muted
          playsInline
          style={styles.videoElement}
        />
        <div style={styles.overlay} />
      </div>

      {/* Side Navigation / Headers */}
      <nav style={styles.sidebar}>
        <div style={styles.sectionHeader}>
          <span>01</span>
          <h2>The Beans</h2>
          <p>Freshly roasted Arabica sourced from the highlands.</p>
        </div>
        <div style={styles.sectionHeader}>
          <span>02</span>
          <h2>The Grind</h2>
          <p>Medium-fine texture for the perfect extraction.</p>
        </div>
        <div style={styles.sectionHeader}>
          <span>03</span>
          <h2>The Pour</h2>
          <p>Hot water meets coffee in a rhythmic dance.</p>
        </div>
        <div style={styles.sectionHeader}>
          <span>04</span>
          <h2>The Mix</h2>
          <p>Silky milk and raw sugar to finish the masterpiece.</p>
        </div>
      </nav>

      {/* Invisible sections to provide scroll height */}
      <div style={{ height: '400vh' }}></div>
    </div>
  );
};

// Inline Styles
const styles = {
  pageContainer: {
    position: 'relative',
    backgroundColor: '#000',
  },
  videoWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 1,
  },
  videoElement: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(to right, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.8))',
    zIndex: 2,
  },
  sidebar: {
    position: 'relative',
    zIndex: 10,
    width: '30%',
    marginLeft: 'auto', // Push to the right
    padding: '10vh 5% 10vh 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '150vh', // Large gap to space headers out along the scroll
  },
  sectionHeader: {
    color: '#fff',
    fontFamily: 'serif',
    textAlign: 'left',
  },
};

export default CoffeeLandingPage;
