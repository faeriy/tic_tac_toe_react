import { useState, useEffect, useRef } from 'react';

export function useAudio() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    
    const backgroundMusicRef = useRef(null);
    const soundEffectRef = useRef(null);

    // Initialize audio elements
    useEffect(() => {
        // Use the base path from Vite config
        const baseUrl = import.meta.env.BASE_URL || '/';

        backgroundMusicRef.current = new Audio(`${baseUrl}sounds/theme.mp3`);
        soundEffectRef.current = new Audio(`${baseUrl}sounds/click.mp3`);
        
        backgroundMusicRef.current.loop = true;
        backgroundMusicRef.current.volume = 0.3; // Lower volume for background music
        soundEffectRef.current.volume = 0.5;

        // Preload the audio files
        backgroundMusicRef.current.load();
        soundEffectRef.current.load();

        return () => {
            if (backgroundMusicRef.current) {
                backgroundMusicRef.current.pause();
                backgroundMusicRef.current = null;
            }
            if (soundEffectRef.current) {
                soundEffectRef.current.pause();
                soundEffectRef.current = null;
            }
        };
    }, []);

    const toggleBackgroundMusic = () => {
        if (!backgroundMusicRef.current) return;

        if (isMusicPlaying) {
            backgroundMusicRef.current.pause();
            setIsMusicPlaying(false);
        } else {
            backgroundMusicRef.current.play().catch(error => {
                console.warn('Could not play background music:', error);
            });
            setIsMusicPlaying(true);
        }
    };

    const toggleSoundEffects = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    const playMoveSound = () => {
        if (!isSoundEnabled || !soundEffectRef.current) return;
        
        soundEffectRef.current.currentTime = 0; // Reset to start
        soundEffectRef.current.play().catch(error => {
            console.warn('Could not play move sound:', error);
        });
    };

    const playWinSound = () => {
        if (!isSoundEnabled || !soundEffectRef.current) return;
        
        // Play the powerup sound twice for win
        soundEffectRef.current.currentTime = 0;
        soundEffectRef.current.play().catch(error => {
            console.warn('Could not play win sound:', error);
        });
        
        // Play again after a short delay
        setTimeout(() => {
            if (soundEffectRef.current && isSoundEnabled) {
                soundEffectRef.current.currentTime = 0;
                soundEffectRef.current.play().catch(error => {
                    console.warn('Could not play win sound (second):', error);
                });
            }
        }, 200);
    };

    const playDrawSound = () => {
        if (!isSoundEnabled || !soundEffectRef.current) return;
        
        // Lower pitched sound for draw (play at slower speed)
        const originalPlaybackRate = soundEffectRef.current.playbackRate;
        soundEffectRef.current.playbackRate = 0.7;
        soundEffectRef.current.currentTime = 0;
        soundEffectRef.current.play().then(() => {
            // Reset playback rate after playing
            setTimeout(() => {
                if (soundEffectRef.current) {
                    soundEffectRef.current.playbackRate = originalPlaybackRate;
                }
            }, 1000);
        }).catch(error => {
            console.warn('Could not play draw sound:', error);
            soundEffectRef.current.playbackRate = originalPlaybackRate;
        });
    };

    return {
        isMusicPlaying,
        isSoundEnabled,
        toggleBackgroundMusic,
        toggleSoundEffects,
        playMoveSound,
        playWinSound,
        playDrawSound
    };
} 