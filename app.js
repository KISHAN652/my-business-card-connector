/**
 * Dynamic Logic for Kishan Sondagar's Digital Connection Card Hub
 * Designed for elite performance and high-end interactive visual craft.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initVCardDownload();
  initWebShare();
});

/**
 * 1. Interactive Spotlight Tracker
 * Updates CSS custom variables with cursor/touch position to run the radial neon spot.
 */
function initSpotlight() {
  const glowSpot = document.getElementById('glowSpot');
  if (!glowSpot) return;

  // Mouse Move tracking for Desktop
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Touch Move tracking for Mobile Devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      document.documentElement.style.setProperty('--mouse-x', `${e.touches[0].clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.touches[0].clientY}px`);
    }
  }, { passive: true });
}

/**
 * 2. vCard (.vcf) Generator & Downloader
 * Instantly compiles a high-compatibility virtual contact card file.
 */
function initVCardDownload() {
  const btnSaveContact = document.getElementById('btnSaveContact');
  if (!btnSaveContact) return;

  btnSaveContact.addEventListener('click', () => {
    // Standard vCard 3.0 template
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Sondagar;Kishan;;;',
      'FN:Kishan Sondagar',
      'ORG:Kishan Sondagar Web Development',
      'TITLE:Web Developer',
      'TEL;TYPE=CELL,VOICE;VALUE=uri:tel:+916353373957',
      'EMAIL;TYPE=PREF,INTERNET:gajjarsk111@gmail.com',
      'URL:https://kishan-sondagar-portfolio.vercel.app/',
      'NOTE:Web Developer specializing in responsive portfolios, business websites, and landing pages.',
      'END:VCARD'
    ].join('\r\n'); // Carriage return line feeds for maximum compatibility across OS

    // Create a Blob containing the vCard content
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const filename = 'Kishan_Sondagar.vcf';

    // Support iOS/Safari and dynamic link downloads
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE/Edge support
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Modern standard browsers
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', filename);
      
      // Append to DOM, click to download, and clean up
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      // Revoke the object URL to free memory after transition time
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }

    // Interactive button tap animation feedback
    const originalText = btnSaveContact.querySelector('.btn-subtitle').textContent;
    btnSaveContact.querySelector('.btn-subtitle').textContent = 'Contact Saved Successfully! 🚀';
    btnSaveContact.style.borderColor = 'var(--neon-cyan)';
    
    setTimeout(() => {
      btnSaveContact.querySelector('.btn-subtitle').textContent = originalText;
      btnSaveContact.style.borderColor = '';
    }, 3000);
  });
}

/**
 * 3. Web Share API & Copy Link System
 * Uses mobile native sharing capabilities when available, fallbacks to clipboard copying.
 */
function initWebShare() {
  const btnShareCard = document.getElementById('btnShareCard');
  const shareStatusMsg = document.getElementById('shareStatusMsg');
  if (!btnShareCard || !shareStatusMsg) return;

  const shareData = {
    title: 'Kishan Sondagar | Web Developer',
    text: 'Check out Kishan Sondagar\'s digital business card, save his contact details, and view his portfolio.',
    url: window.location.href
  };

  btnShareCard.addEventListener('click', async () => {
    // If Web Share API is available on mobile/supported browser
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        displayStatusMessage('Shared successfully! ✨');
      } catch (err) {
        // If they cancelled, do nothing, otherwise fallback
        if (err.name !== 'AbortError') {
          copyLinkFallback();
        }
      }
    } else {
      // Browser fallback (clipboard copy)
      copyLinkFallback();
    }
  });

  function copyLinkFallback() {
    const cardUrl = window.location.href;
    
    navigator.clipboard.writeText(cardUrl).then(() => {
      displayStatusMessage('Link Copied to Clipboard! Send it to anyone! 🚀');
    }).catch(() => {
      // Fail-proof manual selection copy fallback
      const textArea = document.createElement('textarea');
      textArea.value = cardUrl;
      textArea.style.position = 'fixed'; // prevent scroll to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        displayStatusMessage('Link Copied to Clipboard! Send it to anyone! 🚀');
      } catch (err) {
        displayStatusMessage('Could not copy link automatically. Please copy the URL.');
      }
      
      document.body.removeChild(textArea);
    });
  }

  function displayStatusMessage(message) {
    shareStatusMsg.textContent = message;
    shareStatusMsg.style.opacity = '1';
    
    setTimeout(() => {
      shareStatusMsg.style.transition = 'opacity 1s ease-out';
      shareStatusMsg.style.opacity = '0';
      // Wait for fade out animation before resetting content and styles
      setTimeout(() => {
        shareStatusMsg.textContent = '';
        shareStatusMsg.style.transition = '';
      }, 1000);
    }, 4000);
  }
}
