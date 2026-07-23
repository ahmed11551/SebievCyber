import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Certificate } from '../types';
import { exportUserProgressPDF } from '../utils/pdfExporter';
import { X, Award, Download, Share2, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
  userProgressData: any;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose, userProgressData }) => {
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = React.useState(false);

  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/verify-cert/${certificate.verificationCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleLinkedInShare = () => {
    // Construct official LinkedIn certification add URL
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.courseTitle)}&organizationName=${encodeURIComponent('CyberShield Academy')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${encodeURIComponent(certificate.verificationCode)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Официальный Сертификат Об Окончании</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Display Document */}
        <div className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20 text-slate-100 relative border-8 border-slate-800 m-4 rounded-xl shadow-inner">
          {/* Watermark Logo */}
          <div className="absolute right-8 bottom-8 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-cyan-400" />
          </div>

          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 mb-2">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs tracking-widest text-cyan-400 uppercase font-mono">CyberShield Academy • Certificate of Completion</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cyan-200 to-emerald-200">
                СЕРТИФИКАТ КВАЛИФИКАЦИИ
              </h2>
            </div>

            <p className="text-sm text-slate-400">Настоящий документ подтверждает, что</p>

            <div className="py-2 border-b-2 border-dashed border-cyan-500/40 max-w-md mx-auto">
              <span className="text-xl md:text-2xl font-bold text-cyan-300 font-serif tracking-wide">
                {certificate.userFullName}
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              успешно завершил(а) программу профессиональной подготовки и итоговую аттестацию по курсу:
            </p>

            <h3 className="text-lg md:text-xl font-bold text-white px-4 py-2 bg-slate-800/80 rounded-lg inline-block border border-slate-700">
              {certificate.courseTitle}
            </h3>

            {/* Skills Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {certificate.skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-md">
                  ✓ {skill}
                </span>
              ))}
            </div>

            {/* Footer verification details */}
            <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
              <div>
                <span className="block font-mono text-cyan-400">Код подлинности: {certificate.verificationCode}</span>
                <span>Дата выдачи: {certificate.issueDate}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Аттестация пройденa: {certificate.score}% успеха</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportUserProgressPDF(userProgressData)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors shadow-lg shadow-cyan-950"
            >
              <Download className="w-4 h-4" />
              <span>Скачать PDF Отчет</span>
            </button>
            <button
              onClick={handleShareLink}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors border border-slate-700"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Ссылка Скопирована!' : 'Скопировать Ссылку'}</span>
            </button>
          </div>

          <button
            onClick={handleLinkedInShare}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Добавить в LinkedIn Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};
