import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";


const AudioContext = createContext(null);

export function AudioProvider({children}){
    const soundRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);


    const unloadSound = useCallback(async()=>{
        if(soundRef.current){
            try {
                await soundRef.current.unloadAsync()
            } catch (e) {
                
            }
            soundRef.current.setOnPlaybackStatusUpdate(null);
            soundRef.current = null;
        }
    },[]);

    const onStatusUpdate = useCallback((status) => {
        if(!status) return;
        if(status.isLoaded){
            setIsPlaying(status.isPlaying);
            setPosition(status.positionMillis || 0);
            setDuration(status.durationMillis || 0);
        }
        else{
            setIsPlaying(false)
        }
    },[]);

    const loadAndPlay = useCallback(async (track) => {
        setIsLoading(true);
        try{
            await unloadSound();
            const {sound} = await Audio.Sound.createAsync(
                {uri: track.url},
                {shouldPlay: true, progressUpdateIntervalMillis: 500},
                onStatusUpdate
            );
            soundRef.current = sound;
            setCurrentTrack(track);
        } catch(e){
            console.warn('Error loading track', e);
        } finally {
            setIsLoading(false)
        }
    },[onStatusUpdate,unloadSound]);

    const play = useCallback(async()=>{
        if(soundRef.current) await soundRef.current.playAsync()
    },[]);

    const pause = useCallback(async ()=>{
        if(soundRef.current) await soundRef.current.pauseAsync();
    },[]);

    const stop = useCallback(async () => {
        if (soundRef.current) await soundRef.current.stopAsync();
    }, []);
    
    const seekTo = useCallback(async (millis) => {
        if (soundRef.current) await soundRef.current.setPositionAsync(millis);
    }, []);

    const seekBy = useCallback(async (deltaMs)=>{
        const next = Math.max(0,Math.min((position || 0) + deltaMs, duration || 0));
        await seekTo(next);
    },[position,duration,seekTo]);

    useEffect(()=>{
        return () =>{
            unloadSound();
        };
    },[unloadSound]);

    const value = {
        isLoading,
        isPlaying,
        position,
        duration,
        currentTrack,
        loadAndPlay,
        play,
        pause,
        stop,
        seekTo,
        seekBy,
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>

}

export function useAudio(){
    const ctx = useContext(AudioContext);
    if(!ctx) throw new Error('useAudio must be used within AudioProvider')
        return ctx
}