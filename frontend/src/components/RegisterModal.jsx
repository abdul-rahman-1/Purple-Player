import React, { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';

export default function RegisterModal() {
  const { user, registerUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  if (user) return null; // Don't show if already registered

  // Convert image to base64 and validate 1:1 ratio
  function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Validate 1:1 aspect ratio
        if (img.width !== img.height) {
          setError(`Image must be 1:1 ratio (square). Current: ${img.width}x${img.height}`);
          setAvatar(null);
          setAvatarPreview(null);
          return;
        }

        // Store base64 data
        setAvatar(event.target.result);
        setAvatarPreview(event.target.result);
        setError('');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(name, email, avatar);
      // Modal will auto-hide when user is set
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content register-modal">
        <div className="modal-header">
          <h2>💜 Welcome to Purple Player</h2>
          <p>Tell us who you are</p>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="e.g., Samra ( Purple )"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address (Gmail)</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Profile Photo <span className="optional">(1:1 ratio)</span></label>
            <div className="photo-upload-section">
              {avatarPreview ? (
                <div className="photo-preview">
                  <img src={avatarPreview} alt="Profile preview" />
                  <button
                    type="button"
                    className="btn-remove-photo"
                    onClick={handleRemovePhoto}
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <div className="photo-upload-area">
                  <div className="upload-icon">📷</div>
                  <p>Click to upload a 1:1 square photo</p>
                  <span className="upload-hint">Max 5MB • JPG, PNG</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="photo-input"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarPreview ? '📷 Change Photo' : '📷 Upload Photo'}
              </button>
            </div>
          </div>

          <p className="modal-hint">
            Your info is saved securely. We use it to show your online status to the other person.
          </p>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating account...' : '💜 Enter Purple Player'}
          </button>
        </form>

        <p className="modal-footer">
          ✨ Only you and one other person will see this information
        </p>
      </div>
    </div>
  );
}
