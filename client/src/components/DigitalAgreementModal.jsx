import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  CheckCircle2, 
  PenTool, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  X,
  Printer
} from 'lucide-react';

export default function DigitalAgreementModal({ user, t }) {
  const [agreements, setAgreements] = useState([]);
  const [activeAgreement, setActiveAgreement] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  // Canvas drawing state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const fetchAgreements = async () => {
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/agreements', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.agreements?.length > 0) {
        setAgreements(data.agreements);
        setActiveAgreement(data.agreements[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (isSigning && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isSigning]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSignAgreement = async () => {
    if (!hasDrawn) {
      alert('Please draw your digital signature inside the signature box before certifying.');
      return;
    }

    const canvas = canvasRef.current;
    const signatureDataUrl = canvas.toDataURL('image/png');

    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch(`/api/agreements/${activeAgreement._id || activeAgreement.id}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ signature: signatureDataUrl })
      });
      const data = await res.json();
      if (data.success) {
        setActiveAgreement(data.agreement);
        setIsSigning(false);
        setSignedSuccess(true);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-heading flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" />
            <span>{t.agreementHeading}</span>
          </h2>
          <p className="text-sm text-secondary mt-1">
            {t.agreementSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {activeAgreement ? (
        <div className="space-y-6">
          
          {/* Official E-Stamp Paper Display Container */}
          <div className="stamp-paper">
            
            {/* Header / Stamp Banner */}
            <div className="stamp-header">
              <div className="stamp-badge">
                GOVERNMENT OF RAJASTHAN E-STAMP CERTIFICATE
              </div>
              <h3 className="text-xl font-bold tracking-wide text-amber-900 uppercase">
                STUDENT RESIDENTIAL LEASE & TENANCY AGREEMENT
              </h3>
              <p className="text-xs text-amber-800 font-mono mt-1">
                Certificate No: IN-RJ20268874102947 • Date of Issue: {new Date(activeAgreement.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-amber-800">
                Jurisdiction: Local Suburban / University Enclave
              </p>
            </div>

            {/* Parties Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-amber-900/30 rounded bg-amber-50/50 mb-6 text-xs text-slate-800">
              <div>
                <p className="font-bold text-amber-900 uppercase">First Party (Lessor / Landlord):</p>
                <p className="font-bold text-base mt-1">{activeAgreement.landlordName}</p>
                <p>Owner / Operator: {activeAgreement.listingTitle}</p>
                <p>Contact: +91 94140 88990 • Jaipur, Rajasthan</p>
              </div>

              <div>
                <p className="font-bold text-amber-900 uppercase">Second Party (Lessee / Resident Tenant):</p>
                <p className="font-bold text-base mt-1">{activeAgreement.tenantName}</p>
                <p>Aadhaar / Student ID Ref: {activeAgreement.tenantAadhaar}</p>
                <p>Department: Computer Science, University</p>
              </div>
            </div>

            {/* Agreement Terms Clauses */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-800 text-justify">
              <p>
                <strong>1. PREMISES & COMMENCEMENT:</strong> The Lessor hereby lets out accommodation at{' '}
                <strong>{activeAgreement.listingTitle}</strong> to the Lessee starting from{' '}
                <strong>{activeAgreement.startDate}</strong> for a contracted period of{' '}
                <strong>{activeAgreement.lockinPeriodMonths} Months</strong>.
              </p>

              <p>
                <strong>2. MONTHLY RENT & CHARGES:</strong> The agreed monthly rental charges are{' '}
                <strong>₹{Number(activeAgreement.monthlyRent).toLocaleString('en-IN')}/month</strong>, 
                inclusive of 3-time dining meals, high-speed fiber internet, water supply, and housekeeping. 
                Payment shall be remitted on or before the 5th day of every calendar month.
              </p>

              <p>
                <strong>3. SECURITY DEPOSIT:</strong> An interest-free refundable security deposit of{' '}
                <strong>₹{Number(activeAgreement.securityDeposit).toLocaleString('en-IN')}</strong> has been deposited 
                by the Lessee. This deposit shall be refunded upon successful room clearance minus any physical damages.
              </p>

              <p>
                <strong>4. CAMPUS SAFETY & DISCIPLINE:</strong> The Lessee agrees to comply with the standard University 
                Jaipur student residential conduct guidelines. Entry beyond the registered 10:30 PM curfew shall be subject to 
                biometric warden authorization.
              </p>

              <p>
                <strong>5. MAINTENANCE & AMENITIES:</strong> In-room maintenance tickets for electrical, plumbing, or internet 
                issues shall be resolved by the premises facility staff within 24 hours of digital registration on the Smart Stay platform.
              </p>
            </div>

            {/* Signatures Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-6 border-t border-amber-900/40">
              
              {/* Landlord Digital Seal */}
              <div className="text-center p-3 border border-amber-900/20 rounded bg-white/60">
                <p className="text-xs font-bold text-amber-900 uppercase">Authorized Lessor Signatory</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="font-serif italic text-lg text-indigo-900 font-bold border-b border-indigo-900 pb-1">
                    Rajesh Sharma (Proprietor)
                  </span>
                </div>
                <p className="text-[10px] text-muted">Digitally Certified & Approved</p>
              </div>

              {/* Tenant Signature Area */}
              <div className="text-center p-3 border border-amber-900/20 rounded bg-white/60">
                <p className="text-xs font-bold text-amber-900 uppercase">Tenant / Student Signature</p>
                
                <div className="h-16 flex items-center justify-center">
                  {activeAgreement.status === 'signed' ? (
                    <div>
                      {activeAgreement.tenantSignature?.startsWith('data:') ? (
                        <img 
                          src={activeAgreement.tenantSignature} 
                          alt="Signature" 
                          className="h-12 max-w-[200px] object-contain mx-auto"
                        />
                      ) : (
                        <span className="font-serif italic text-lg text-blue-800 font-bold border-b border-blue-800">
                          {activeAgreement.tenantName}
                        </span>
                      )}
                      <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        ✓ Digitally Signed on {new Date(activeAgreement.signedAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsSigning(true)}
                      className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 mx-auto"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{t.signAgreementBtn}</span>
                    </button>
                  )}
                </div>

                <p className="text-[10px] text-muted">Aadhaar Verified Digital Consent</p>
              </div>

            </div>

            {/* Status Watermark */}
            {activeAgreement.status === 'signed' && (
              <div className="absolute top-6 right-6 border-2 border-emerald-600 text-emerald-600 font-bold text-xs uppercase px-3 py-1 rounded tracking-wider rotate-12 bg-white/90 shadow">
                ✓ CERTIFIED & EXECUTED
              </div>
            )}

          </div>

          {/* Interactive Signature Modal Pad */}
          {isSigning && (
            <div className="modal-overlay">
              <div className="modal-content max-w-md p-6">
                <div className="flex items-center justify-between pb-3 border-b border-color mb-4">
                  <h3 className="text-base font-bold text-primary flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-indigo-500" />
                    <span>Draw Digital Signature</span>
                  </h3>
                  <button onClick={() => setIsSigning(false)} className="btn-secondary p-1.5 rounded-full">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-secondary mb-3">
                  Please draw your authentic signature inside the box using your mouse or touch screen. This will be affixed to your official Rajasthan E-Stamp lease.
                </p>

                {/* Canvas Drawing Pad */}
                <div className="border-2 border-dashed border-indigo-400 rounded-xl overflow-hidden bg-white mb-3">
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-40 cursor-crosshair block"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-color">
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 text-rose-500 hover:text-rose-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSigning(false)}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSignAgreement}
                      className="btn-primary text-xs py-1.5 px-4"
                    >
                      Certify & Affix Signature
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="p-8 text-center glass-panel">
          <p className="text-muted text-sm">Loading rental agreement details...</p>
        </div>
      )}

    </div>
  );
}
