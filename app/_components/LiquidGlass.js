export default function LiquidGlass({ minWidth, minHeight, children }) {
    // styles object we created earlier
    const styles = {
        /* ========== CONTAINER ========== */
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        containerInline: {
            flexDirection: 'row',
        },

        /* ========== GLASS CONTAINER ========== */
        glassContainer: {
            position: 'relative',
            display: 'flex',
            fontWeight: 600,
            color: 'var(--lg-text)',
            cursor: 'pointer',
            background: 'transparent',
            borderRadius: '2rem',
            overflow: 'hidden',
            boxShadow:
                '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)',
            height: 'auto',
        },
        glassContainerLarge: {
            minWidth: `${minWidth}`,
            minHeight: `${minHeight}`,
        },

        /* ========== PLAYER ========== */
        player: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flex: '1 1 auto',
            justifyContent: 'space-between',
        },
        playerThumb: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.5rem',
        },
        playerImg: {
            width: '5rem',
            height: 'auto',
            margin: '0.25rem 0',
            borderRadius: '0.5rem',
        },
        playerLegend: {
            display: 'flex',
            flexDirection: 'column',
            margin: '0 1rem',
            color: 'black',
        },
        playerLegendTitle: {
            fontSize: '1rem',
            margin: 0,
            color: '#fff',
            textShadow: '0 0 3px #444',
        },
        playerLegendSubTitle: {
            fontSize: '1rem',
            margin: 0,
            opacity: 0.45,
            color: '#ccc',
            textShadow: '0 0 3px #444',
        },
        playerControls: {
            marginRight: '-1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fill: '#fff',
        },
        playerControlsPlay: {
            marginRight: '1rem',
            display: 'flex',
        },
        playerControlsFf: {
            display: 'flex',
        },

        /* ========== GLASS LAYERS ========== */
        glassFilter: {
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backdropFilter: 'blur(0px)',
            filter: 'url(#lg-dist)',
            isolation: 'isolate',
        },
        glassOverlay: {
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'rgba(255, 255, 255, 0.25)',
        },
        glassSpecular: {
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            borderRadius: 'inherit',
            overflow: 'hidden',
            boxShadow:
                'inset 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 0 5px rgba(255, 255, 255, 0.75)',
        },
        glassContent: {
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '1rem 1.5rem 0.9rem',
        },
        glassContentInline: {
            padding: '0.25rem 2rem 0.25rem 0.75rem',
            flex: '1 1 auto',
            justifyContent: 'space-between',
        },
    };

    return (
        <>
            <div style={{ ...styles.container, ...styles.containerInline }}>
                <div
                    style={{
                        ...styles.glassContainer,
                        ...styles.glassContainerLarge,
                    }}
                >
                    <div style={styles.glassFilter}></div>
                    <div style={styles.glassOverlay}></div>
                    <div style={styles.glassSpecular}></div>
                    <div
                        style={{
                            ...styles.glassContent,
                            ...styles.glassContentInline,
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
