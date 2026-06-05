const fs = require('fs');
const path = require('path');

function convertToReact(htmlStr) {
  return htmlStr
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/style="([^"]*)"/g, (match, p1) => {
      // Basic inline style to object converter
      const styleObj = {};
      p1.split(';').forEach(rule => {
        if (!rule.trim()) return;
        const [key, value] = rule.split(':');
        if (key && value) {
          const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          styleObj[camelKey] = value.trim();
        }
      });
      return `style={${JSON.stringify(styleObj)}}`;
    })
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments
    .replace(/<script[\s\S]*?<\/script>/gi, ''); // remove scripts
}

const backupDir = path.join(__dirname, '..', '_backup');
const pagesDir = path.join(__dirname, 'src', 'pages');

try {
  const indexHtml = fs.readFileSync(path.join(backupDir, 'index.html'), 'utf8');
  const loginHtml = fs.readFileSync(path.join(backupDir, 'login.html'), 'utf8');

  const getBodyContent = (html) => {
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1] : '';
  };

  const indexBody = convertToReact(getBodyContent(indexHtml));
  const loginBody = convertToReact(getBodyContent(loginHtml));

  const landingComponent = `import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      ${indexBody.replace(/<div id="canvas-container"><\/div>/g, '') // already in layout
                 .replace(/<div class="nav-float"[\s\S]*?<\/div>/g, '') // handled by Navigation component
      }
    </>
  );
};
export default Landing;`;

  const loginComponent = `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div id="overlay" className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="auth-card pointer-events-auto relative w-[min(420px,calc(100vw-32px))] bg-[rgba(10,18,10,0.58)] backdrop-blur-[22px] border border-[rgba(140,180,120,0.18)] rounded-[22px] px-10 pt-11 pb-9 flex flex-col items-start shadow-[0_0_0_1px_rgba(200,240,120,0.04)_inset,0_28px_70px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.3)]">
        
        <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)] mb-4">Rooted in Tomorrow</span>
        
        <h1 className="font-serif text-[clamp(30px,4.5vw,44px)] font-normal leading-[1.05] text-[#f8fcf0] mb-2 drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
          {activeTab === 'login' ? <>Welcome <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Back</em></> : <>Join the <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Oasis</em></>}
        </h1>
        <p className="text-[13px] font-light text-[rgba(215,230,190,0.55)] mb-7 tracking-[0.2px]">
          {activeTab === 'login' ? 'Sign in to your sanctuary' : 'Create your sanctuary account'}
        </p>

        <div className="flex w-full bg-[rgba(8,15,8,0.5)] border border-[rgba(140,180,120,0.18)] rounded-xl p-1 mb-[30px] gap-1">
          <button 
            className={\`flex-1 p-[9px] rounded-lg bg-transparent text-[12px] font-medium tracking-[1.4px] uppercase transition-all \${activeTab === 'login' ? 'bg-[rgba(20,38,16,0.7)] text-accent shadow-[0_0_0_1px_rgba(180,210,140,0.2)_inset,0_2px_8px_rgba(0,0,0,0.3)]' : 'text-[rgba(215,230,190,0.55)]'}\`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={\`flex-1 p-[9px] rounded-lg bg-transparent text-[12px] font-medium tracking-[1.4px] uppercase transition-all \${activeTab === 'register' ? 'bg-[rgba(20,38,16,0.7)] text-accent shadow-[0_0_0_1px_rgba(180,210,140,0.2)_inset,0_2px_8px_rgba(0,0,0,0.3)]' : 'text-[rgba(215,230,190,0.55)]'}\`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {error && <div className="text-[11.5px] font-light p-3 rounded-lg mb-4 w-full tracking-[0.2px] leading-relaxed bg-[rgba(180,60,40,0.15)] border border-[rgba(220,80,60,0.2)] text-[rgba(255,160,140,0.85)]">{error}</div>}

        <form onSubmit={handleAuth} className="w-full flex flex-col">
          {activeTab === 'register' && (
            <div className="w-full mb-3.5 relative">
              <label className="block text-[10px] font-medium tracking-[2px] uppercase text-[rgba(210,230,160,0.65)] mb-2">Full Name</label>
              <input type="text" className="glass-input w-full p-3 text-[13.5px] font-light placeholder:text-[rgba(180,210,150,0.25)]" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}

          <div className="w-full mb-3.5 relative">
            <label className="block text-[10px] font-medium tracking-[2px] uppercase text-[rgba(210,230,160,0.65)] mb-2">Email</label>
            <input type="email" className="glass-input w-full p-3 text-[13.5px] font-light placeholder:text-[rgba(180,210,150,0.25)]" placeholder="you@sanctuary.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="w-full mb-3.5 relative">
            <label className="block text-[10px] font-medium tracking-[2px] uppercase text-[rgba(210,230,160,0.65)] mb-2">Password</label>
            <input type="password" className="glass-input w-full p-3 text-[13.5px] font-light placeholder:text-[rgba(180,210,150,0.25)]" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {activeTab === 'register' && (
            <div className="w-full mb-5 relative">
              <label className="block text-[10px] font-medium tracking-[2px] uppercase text-[rgba(210,230,160,0.65)] mb-2">Confirm Password</label>
              <input type="password" className="glass-input w-full p-3 text-[13.5px] font-light placeholder:text-[rgba(180,210,150,0.25)]" placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          {activeTab === 'login' && (
            <div className="w-full flex justify-end mb-5 mt-[-6px]">
              <a href="#" className="text-[11px] font-light text-[rgba(210,230,160,0.4)] hover:text-accent transition-colors">Forgot password?</a>
            </div>
          )}

          <button type="submit" className={\`glass-button w-full p-[15px] mb-[22px] \${loading ? 'pointer-events-none' : ''}\`}>
            {loading ? <div className="w-[18px] h-[18px] border-[1.5px] border-[rgba(230,245,120,0.2)] border-t-[rgba(230,245,120,0.9)] rounded-full animate-spin"></div> : null}
            <span className={\`text-[11.5px] font-medium tracking-[1.8px] text-accent uppercase transition-opacity \${loading ? 'opacity-50' : ''}\`}>
              {activeTab === 'login' ? 'Enter the Oasis' : 'Join the Oasis'}
            </span>
          </button>
        </form>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(140,180,120,0.12)] to-transparent mb-5"></div>
        <p className="text-[11px] font-light text-[rgba(215,230,190,0.32)] self-center tracking-[0.3px]">
          {activeTab === 'login' ? 'New here? Your oasis awaits.' : 'Already have an account? Sign in above.'}
        </p>

      </div>
    </div>
  );
};

export default Login;`;

  fs.writeFileSync(path.join(pagesDir, 'Landing.jsx'), landingComponent);
  fs.writeFileSync(path.join(pagesDir, 'Login.jsx'), loginComponent);
  console.log('Successfully ported HTML files to React components');
} catch (e) {
  console.error("Error reading backup files", e);
}
