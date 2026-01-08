export const SOUNDS = {
  LOBBY_1: '/music/Voicy_killer instinct.mp3',
  LOBBY_2: '/music/Voicy_Killer Instinct Sound Track.mp3',
  BOSS_SELECTION: '/music/Voicy_KILLER INSTINCT  PART 4.mp3',
  READY_FIGHT: '/music/Voicy_Ready fight.mp3',
  HIT: '/music/Voicy_Kick shots sound effect.mp3',
  DAMAGE: '/music/Voicy_Sword sound effect.mp3',
  COMBO_BREAKER: '/music/Voicy_combo breaker.mp3',
  VICTORY: '/music/Voicy_Supreme victory.mp3',
  ULTRA_COMBO: '/music/Voicy_Ultra combooooo.mp3',
  FIGHTING_COMBO: '/music/Voicy_Fighting sound effect.mp3',
  FIGHTING_COMBO_FIVE_HITS: '/music/Voicy_Blaster Combo .mp3'
};

class AudioManager {
  constructor() {
    this.music = null;
    this.currentTrack = null;
    this.isMuted = false;
  }

  playSFX(path, volume = 0.4, fadeDuration = 0) {
    const audio = new Audio(path);
    if (fadeDuration > 0) {
      audio.volume = 0;
      audio.play().then(() => {
        const steps = 10;
        const interval = fadeDuration / steps;
        const volStep = volume / steps;
        const fade = setInterval(() => {
          if (audio.volume < volume - volStep) audio.volume += volStep;
          else { audio.volume = volume; clearInterval(fade); }
        }, interval);
      }).catch(e => console.log("Audio play blocked", e));
    } else {
      audio.volume = volume;
      audio.play().catch(e => console.log("Audio play blocked", e));
    }
  }

  playMusic(path, loop = true, onEnd = null, volume = 0.5, fadeDuration = 3000) {
    if (this.currentTrack === path && this.music && !this.music.paused) return;
    
    if (this.music) {
      this.music.onended = null;
      this.fadeOut(1500); // Gradual exit for current music
    }

    const nextMusic = new Audio(path);
    nextMusic.loop = loop;
    nextMusic.volume = 0; // Start from silent
    this.music = nextMusic;
    this.currentTrack = path;
    
    if (onEnd) {
      this.music.onended = onEnd;
    }

    this.music.play().then(() => {
      this.fadeIn(volume, fadeDuration);
    }).catch(e => console.log("Music play blocked", e));
  }

  setVolume(volume) {
    if (this.music) {
      this.music.volume = Math.max(0, Math.min(1, volume));
    }
  }

  fadeIn(targetVolume, duration = 2000) {
    if (!this.music) return;
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = targetVolume / steps;

    const fade = setInterval(() => {
      if (this.music && this.music.volume < targetVolume - volumeStep) {
        this.music.volume += volumeStep;
      } else if (this.music) {
        this.music.volume = targetVolume;
        clearInterval(fade);
      } else {
        clearInterval(fade);
      }
    }, interval);
  }

  fadeOut(duration = 2000) {
    if (!this.music) return;
    const musicToFade = this.music;
    const startVolume = musicToFade.volume;
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = startVolume / steps;

    const fade = setInterval(() => {
      if (musicToFade && musicToFade.volume > volumeStep) {
        musicToFade.volume -= volumeStep;
      } else {
        clearInterval(fade);
        musicToFade.pause();
        if (this.music === musicToFade) {
          this.music = null;
          this.currentTrack = null;
        }
      }
    }, interval);
  }

  stopMusic() {
    this.fadeOut(1500);
  }
}

export const audioManager = new AudioManager();
