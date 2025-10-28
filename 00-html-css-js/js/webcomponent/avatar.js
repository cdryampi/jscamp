class IndioAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    createServiceUrl(service, username) {
        if (!service || !username) return 'https://unavatar.io/github/cdryampi';
        let url = `https://unavatar.io/${service}/${username}`;
        return url;
    }

    getTextDescription(service, username) {
        switch (service) {
            case 'github':
                return {
                    label: 'Desarrollado por',
                    link: `https://github.com/${username}`,
                    display: `@${username}`
                }
            case 'x':
                return {
                    label: 'Sígueme en X',
                    link: `https://x.com/${username}`,
                    display: `@${username}`
                }
            case 'linkedin':
                return {
                    label: 'Conéctate en LinkedIn',
                    link: `https://www.linkedin.com/in/${username}`,
                    display: username
                }
            case 'twitter':
                return {
                    label: 'Sígueme en Twitter',
                    link: `https://twitter.com/${username}`,
                    display: `@${username}`
                }
            case 'facebook':
                return {
                    label: 'Conéctate en Facebook',
                    link: `https://www.facebook.com/${username}`,
                    display: username
                }
            default:
                return {
                    label: 'Desarrollado por',
                    link: `https://github.com/${username}`,
                    display: `@${username}`
                }
        }
    }

    render() {
        const service = this.getAttribute('service') ?? 'github';
        const username = this.getAttribute('username') ?? 'cdryampi';
        const imageUrl = this.createServiceUrl(service, username);
        const serviceInfo = this.getTextDescription(service, username);
        this.getServiceInfo = () => serviceInfo;
        this.shadowRoot.innerHTML = `
            <style>
                .avatar-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .avatar-container:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                
                .avatar-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid currentColor;
                    transition: transform 0.3s ease;
                }
                
                .avatar-container:hover .avatar-image {
                    transform: scale(1.1);
                }
                
                .avatar-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .avatar-label {
                    font-size: 0.75rem;
                    opacity: 0.8;
                    margin: 0;
                }
                
                .avatar-link {
                    color: inherit;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: opacity 0.3s ease;
                }
                
                .avatar-link:hover {
                    opacity: 0.8;
                    text-decoration: underline;
                }
            </style>
            
            <div class="avatar-container">
                <img 
                    src="${imageUrl}" 
                    alt="Avatar de ${username}" 
                    class="avatar-image"
                />
                <div class="avatar-info">
                    <p class="avatar-label">${serviceInfo.label}</p>
                    <a 
                        href="${serviceInfo.link}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="avatar-link"
                    >${serviceInfo.display}</a>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('indio-avatar', IndioAvatar);