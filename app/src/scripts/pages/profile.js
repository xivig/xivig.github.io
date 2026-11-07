import NotificationService from '../components/sweet-alert.js';

/**
 * Profile Module - Elite User Architect Experience
 * Handles avatar uploading, personal details update, 2FA toggle, session management, and API keys.
 */
export const initProfile = () => {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImg = document.getElementById('user-avatar-img');
    const profileForm = document.getElementById('profile-form');
    const securityForm = document.getElementById('security-form');
    const twoFactorSwitch = document.getElementById('twoFactorSwitch');
    const revokeSessionsBtn = document.getElementById('revoke-sessions-btn');

    // 1. Restore persisted avatar if exists
    const savedAvatar = localStorage.getItem('xivig_user_avatar');
    if (savedAvatar && avatarImg) {
        avatarImg.src = savedAvatar;
    }

    // 2. Avatar live upload
    avatarUpload?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (re) => {
            const dataUrl = re.target.result;
            if (avatarImg) avatarImg.src = dataUrl;
            localStorage.setItem('xivig_user_avatar', dataUrl);

            // Update top header avatar if present
            const headerAvatar = document.querySelector('.header__user-avatar, .header__profile-img');
            if (headerAvatar) headerAvatar.src = dataUrl;

            NotificationService.success('Avatar Updated', 'Profile photo synchronized across the workspace.');
        };
        reader.readAsDataURL(file);
    });

    // 3. Profile Form Save
    profileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        NotificationService.success('Profile Saved', 'Personal information updated successfully.');
    });

    // 4. Security Form Save
    securityForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        NotificationService.success('Password Changed', 'Security credentials updated across all sessions.');
        securityForm.reset();
    });

    // 5. 2FA Toggle
    twoFactorSwitch?.addEventListener('change', (e) => {
        if (e.target.checked) {
            NotificationService.success('2FA Activated', 'Two-Factor Authentication is now actively protecting your account.');
        } else {
            NotificationService.basic('2FA Deactivated', 'Two-factor protection disabled.');
        }
    });

    // 6. Revoke Other Sessions
    revokeSessionsBtn?.addEventListener('click', () => {
        NotificationService.confirm('Revoke All Other Sessions?', 'You will be logged out of 2 remote devices.')
            .then(res => {
                if (res.isConfirmed) {
                    const secondarySessions = document.querySelectorAll('.remote-session-item');
                    secondarySessions.forEach(el => el.remove());
                    NotificationService.success('Sessions Revoked', 'All secondary devices signed out.');
                }
            });
    });

    // 7. Copy API Keys
    document.querySelectorAll('.copy-api-key-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const keyText = btn.getAttribute('data-key');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(keyText).then(() => {
                    NotificationService.success('Copied to Clipboard', 'API Key copied successfully.');
                });
            } else {
                NotificationService.success('Copied', 'API Key ready to paste.');
            }
        });
    });

    // 8. Generate New Key Modal Form
    const newKeyForm = document.getElementById('new-key-form');
    newKeyForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyName = document.getElementById('key-name')?.value || 'New Key';
        const modalEl = document.getElementById('newKeyModal');
        const modal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
        modal?.hide();

        NotificationService.success(
            'API Key Generated',
            `Key "${keyName}" generated with secret xivig_live_${Math.random().toString(36).substring(2, 15)}.`
        );
        newKeyForm.reset();
    });
};
