class IndioAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    render() {
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
                    src="https://unavatar.io/github/cdryampi" 
                    alt="Avatar de cdryampi" 
                    class="avatar-image"
                />
                <div class="avatar-info">
                    <p class="avatar-label">Desarrollado por</p>
                    <a 
                        href="https://github.com/cdryampi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="avatar-link"
                    >
                        @cdryampi
                    </a>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('indio-avatar', IndioAvatar);