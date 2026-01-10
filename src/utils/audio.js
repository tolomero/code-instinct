export const SOUNDS = {
  LOBBY_1: '/music/killer_instinct.mp3',
  LOBBY_2: '/music/killer_instinct_sound_track.mp3',
  BOSS_SELECTION: '/music/killer_instinct_part_4.mp3',
  READY_FIGHT: '/music/ready_fight.mp3',
  HIT: '/music/kick_shots_sound_effect.mp3',
  DAMAGE: '/music/sword_sound_effect.mp3',
  COMBO_BREAKER: '/music/combo_breaker.mp3',
  VICTORY: '/music/supreme_victory.mp3',
  ULTRA_COMBO: '/music/ultra_combooooo.mp3',
  FIGHTING_COMBO: '/music/fighting_sound_effect.mp3',
  FIGHTING_COMBO_FIVE_HITS: '/music/blaster_combo_.mp3',
  DEV_ATTACK: '/music/playinclass.mp3',
  PIKACHU_SPECIAL: '/music/pikachu-thunder.mp3',
  FATALITY: '/music/fatality.mp3',
  TRALALERO_ATTACK: '/music/tralalero_tralala_.mp3',
  POKEMON_BGM: '/music/pokemon_bgm.mp3',
  CRY_CHARMANDER: '/music/charmander_.mp3',
  CRY_CHARMELEON: '/music/charmeleon_pokemon_-_2.mp3',
  CRY_CHARIZARD: '/music/charizard_angry_anime_cry_sfx.mp3',
  CRY_PIKACHU: '/music/pikachu_.mp3',
};

class AudioManager {
  constructor() {
    this.music = null;
    this.currentTrack = null;
    this.isMuted = false;
  }

  playSFX(path, volume = 0.4, fadeDuration = 0, maxDuration = 0) {
    try {
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
        }).catch(e => console.log("SFX play blocked", e));
      } else {
        audio.volume = volume;
        audio.play().catch(e => console.log("SFX play blocked", e));
      }

      if (maxDuration > 0) {
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, maxDuration);
      }
    } catch (e) {
      console.error("Error playing SFX:", e);
    }
  }

  playMusic(path, loop = true, onEnd = null, volume = 0.5, fadeDuration = 2000) {
    // If the same track is already playing, don't restart it
    if (this.currentTrack === path && this.music && !this.music.paused) {
      return;
    }
    
    console.log(`Attempting to play music: ${path}`);

    // If there's music playing, fade it out and stop it
    if (this.music) {
      const oldMusic = this.music;
      oldMusic.onended = null;
      this.fadeOutAudio(oldMusic, 1000);
    }

    const nextMusic = new Audio(path);
    nextMusic.loop = loop;
    nextMusic.volume = 0; 
    this.music = nextMusic;
    this.currentTrack = path;
    
    if (onEnd) {
      nextMusic.onended = onEnd;
    }

    nextMusic.play().then(() => {
      this.fadeInAudio(nextMusic, volume, fadeDuration);
    }).catch(e => {
      console.warn("Music play blocked by browser. Retrying on next interaction.", e);
      // Fallback: try to play it with volume directly if fadeIn failed
      nextMusic.volume = volume;
      // We don't retry here, we wait for next call or interaction
    });
  }

  setVolume(volume) {
    if (this.music) {
      this.music.volume = Math.max(0, Math.min(1, volume));
    }
  }

  fadeInAudio(audio, targetVolume, duration = 2000) {
    if (!audio) return;
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = targetVolume / steps;

    const fade = setInterval(() => {
      if (audio && audio.volume < targetVolume - volumeStep) {
        audio.volume += volumeStep;
      } else if (audio) {
        audio.volume = targetVolume;
        clearInterval(fade);
      } else {
        clearInterval(fade);
      }
    }, interval);
  }

  fadeOutAudio(audio, duration = 2000) {
    if (!audio) return;
    const startVolume = audio.volume;
    const steps = 20;
    const interval = duration / steps;
    const volumeStep = startVolume / steps;

    const fade = setInterval(() => {
      if (audio && audio.volume > volumeStep) {
        audio.volume -= volumeStep;
      } else {
        clearInterval(fade);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }, interval);
  }

  stopMusic() {
    if (this.music) {
      this.fadeOutAudio(this.music, 1000);
      this.music = null;
      this.currentTrack = null;
    }
  }
}

export const audioManager = new AudioManager();
