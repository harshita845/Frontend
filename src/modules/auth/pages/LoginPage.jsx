import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TextField, Button, CircularProgress, InputAdornment, 
  Tabs, Tab, Box 
} from '@mui/material';
import { FiSmartphone, FiUser, FiMail, FiCheckCircle, FiShield, FiLock, FiEye, FiEyeOff, FiShoppingBag } from 'react-icons/fi';
import Logo from '../../../shared/components/Logo';
import { sendOtpStart, sendOtpSuccess, verifyOtpSuccess } from '../store/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth Redux Selectors
  const { loading, otpSent, tempPhone } = useSelector(state => state.auth);

  // Local UI States
  const [tabValue, setTabValue] = useState(0); // 0: Login, 1: Signup
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setValidationError('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (tabValue === 1 && (!password || password.length < 6)) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }
    setValidationError('');
    dispatch(sendOtpStart());

    // Mock network request delay
    setTimeout(() => {
      dispatch(sendOtpSuccess(phoneNumber));
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 4) {
      setValidationError('Please enter the 4-digit code sent to your phone');
      return;
    }
    setValidationError('');
    dispatch(sendOtpStart()); // triggers loader

    // Mock network request delay for verification
    setTimeout(() => {
      const mockUser = {
        name: tabValue === 0 ? 'Ramesh Kumar' : userName || 'Anoop Singh',
        phone: tempPhone || phoneNumber,
        email: tabValue === 0 ? 'ramesh@gmail.com' : emailAddress || 'anoop@gmail.com',
        joinedDate: new Date().toISOString().split('T')[0],
        role: 'customer' // Defaults to standard client role
      };
      const mockToken = `MOCK-JWT-TOKEN-${Date.now()}`;
      dispatch(verifyOtpSuccess({ user: mockUser, token: mockToken }));
      navigate('/');
    }, 1200);
  };

  const handleQuickLogin = (role) => {
    dispatch(sendOtpStart());
    setTimeout(() => {
      let mockUser = {
        joinedDate: new Date().toISOString().split('T')[0]
      };
      if (role === 'admin') {
        mockUser = {
          ...mockUser,
          name: 'Super Admin',
          phone: '9999999999',
          email: 'admin@emediclub.com',
          role: 'admin'
        };
      } else if (role === 'vendor') {
        mockUser = {
          ...mockUser,
          name: 'MedPlus Wellness Manager',
          phone: '8888888888',
          email: 'vendor@emediclub.com',
          role: 'vendor'
        };
      } else {
        mockUser = {
          ...mockUser,
          name: 'Ramesh Kumar',
          phone: '9876543201',
          email: 'ramesh@gmail.com',
          role: 'customer'
        };
      }
      const mockToken = `MOCK-JWT-TOKEN-${role}-${Date.now()}`;
      dispatch(verifyOtpSuccess({ user: mockUser, token: mockToken }));
      
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 border border-slate-100 shadow-premium relative overflow-hidden"
      >
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-teal-light rounded-full filter blur-2xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-forest-light rounded-full filter blur-2xl opacity-60" />

        {/* Top Logo branding */}
        <div className="flex flex-col items-center justify-center mb-6">
          <Logo layout="stacked" showText={true} />
          <h2 className="text-xl font-extrabold text-slate-800 mt-5">
            {otpSent ? 'Confirm Verification' : tabValue === 0 ? 'Welcome Back!' : 'Create New Account'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1.5 text-center leading-relaxed">
            {otpSent 
              ? `We have texted a 4-digit code to +91 ${tempPhone}`
              : tabValue === 0 ? 'Sign in with OTP to access your health locker' : 'Register in 30 seconds to book clinical tests'}
          </p>
        </div>

        {/* Dynamic Forms */}
        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.form
              key={tabValue === 0 ? 'login' : 'signup'}
              initial={{ opacity: 0, x: tabValue === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tabValue === 0 ? 15 : -15 }}
              onSubmit={handleSendOtp}
              className="flex flex-col gap-4.5"
            >
              {/* Form Switching Tabs using Material UI */}
              <Box className="border-b border-slate-100 mb-2">
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  className="font-bold"
                >
                  <Tab label="LOGIN" className="font-extrabold text-xs tracking-wider" />
                  <Tab label="SIGNUP" className="font-extrabold text-xs tracking-wider" />
                </Tabs>
              </Box>

              {/* Sign up details */}
              {tabValue === 1 && (
                <>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiUser className="text-slate-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiMail className="text-slate-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiLock className="text-slate-400" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-transparent border-0 cursor-pointer text-slate-400 hover:text-slate-650 flex items-center p-1"
                          >
                            {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                          </button>
                        </InputAdornment>
                      )
                    }}
                  />
                </>
              )}

              {/* Phone number field using MUI TextField with InputAdornment */}
              <TextField
                label="Mobile Number"
                type="tel"
                variant="outlined"
                fullWidth
                required
                inputProps={{ maxLength: 10 }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span className="text-slate-500 font-bold text-sm border-r border-slate-200 pr-2.5 mr-1 flex items-center gap-1.5">
                        <FiSmartphone className="text-slate-400 shrink-0" />
                        <span>+91</span>
                      </span>
                    </InputAdornment>
                  ),
                }}
              />

              {validationError && (
                <p className="text-coral text-xs font-bold leading-tight px-1">{validationError}</p>
              )}

              {/* Submit trigger using Material UI Button styled with Tailwind */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                className="py-3.5 bg-forest hover:bg-forest-dark text-white rounded-2xl shadow-sm text-sm font-black transition-all"
                style={{ borderRadius: '16px' }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <span>{tabValue === 0 ? 'CONTINUE' : 'REGISTER'}</span>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleVerifyOtp}
              className="flex flex-col gap-4"
            >
              {/* OTP Input using MUI TextField */}
              <TextField
                label="Enter 4-Digit OTP"
                variant="outlined"
                fullWidth
                required
                inputProps={{ maxLength: 4, style: { textAlign: 'center', letterSpacing: '8px', fontWeight: 900 } }}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                helperText="Use test code '1234' to verify instantly."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiShield className="text-slate-400" />
                    </InputAdornment>
                  ),
                }}
              />

              {validationError && (
                <p className="text-coral text-xs font-bold leading-tight px-1">{validationError}</p>
              )}

              {/* Submit code using MUI Button */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                className="py-3.5 bg-teal hover:bg-teal-dark text-white rounded-2xl shadow-sm text-sm font-black transition-all"
                style={{ borderRadius: '16px' }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <span className="flex items-center gap-1.5">
                    <FiCheckCircle />
                    <span>VERIFY AND LOGIN</span>
                  </span>
                )}
              </Button>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mt-2 px-1">
                <span>Didn't get code?</span>
                <button type="button" onClick={handleSendOtp} className="text-teal hover:underline font-extrabold">
                  Resend OTP
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>



        {/* Health Disclaimer badges */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-4 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <FiShield className="text-teal w-3.5 h-3.5" /> 100% SECURE
          </span>
          <span className="flex items-center gap-1">
            <FiCheckCircle className="text-teal w-3.5 h-3.5" /> GENUINE CARE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
