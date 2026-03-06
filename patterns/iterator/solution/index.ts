// Iterator Pattern
// Provides sequential access to elements of a collection without
// exposing its underlying structure. Different iterators can traverse
// the same collection in different ways.

// --- Data type ---

type Song = {
  title: string;
  artist: string;
  duration: number; // in seconds
  genre: string;
};

// --- Iterator interface ---

interface SongIterator {
  hasNext(): boolean;
  next(): Song;
}

// --- FavoritesPlaylist ---
// Stores songs in a simple array, ordered by the time they were added.

class FavoritesPlaylist {
  private songs: Song[] = [];

  addSong(song: Song): void {
    this.songs.push(song);
  }

  createIterator(): SongIterator {
    let index = 0;
    const songs = this.songs;

    return {
      hasNext(): boolean {
        return index < songs.length;
      },
      next(): Song {
        return songs[index++];
      },
    };
  }
}

// --- RecentlyPlayedPlaylist ---
// Stores songs in a fixed-size circular buffer (max 5 songs).
// When a new song is added beyond capacity, it overwrites the oldest entry.

class RecentlyPlayedPlaylist {
  private buffer: (Song | null)[];
  private head = 0; // next write position
  private count = 0;
  private capacity: number;

  constructor(capacity = 5) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
  }

  addSong(song: Song): void {
    this.buffer[this.head] = song;
    this.head = (this.head + 1) % this.capacity;
    if (this.count < this.capacity) {
      this.count++;
    }
  }

  createIterator(): SongIterator {
    // Start from the oldest entry and iterate through all valid entries
    const start = this.count < this.capacity ? 0 : this.head;
    const total = this.count;
    const buffer = this.buffer;
    const capacity = this.capacity;
    let visited = 0;

    return {
      hasNext(): boolean {
        return visited < total;
      },
      next(): Song {
        const index = (start + visited) % capacity;
        visited++;
        return buffer[index]!;
      },
    };
  }
}

// --- GenrePlaylist ---
// Stores songs in a Map<string, Song[]> grouped by genre.
// Supports two traversal modes: by genre and alphabetical.

class GenrePlaylist {
  private genres = new Map<string, Song[]>();

  addSong(song: Song): void {
    if (!this.genres.has(song.genre)) {
      this.genres.set(song.genre, []);
    }
    this.genres.get(song.genre)!.push(song);
  }

  // Iterates genre by genre, all songs in one genre before moving to the next
  createByGenreIterator(): SongIterator {
    const entries = Array.from(this.genres.entries());
    let genreIndex = 0;
    let songIndex = 0;

    return {
      hasNext(): boolean {
        while (genreIndex < entries.length) {
          if (songIndex < entries[genreIndex][1].length) {
            return true;
          }
          genreIndex++;
          songIndex = 0;
        }
        return false;
      },
      next(): Song {
        const song = entries[genreIndex][1][songIndex];
        songIndex++;
        return song;
      },
    };
  }

  // Iterates all songs across genres sorted alphabetically by title
  createAlphabeticalIterator(): SongIterator {
    const allSongs: Song[] = [];
    for (const songs of this.genres.values()) {
      allSongs.push(...songs);
    }
    allSongs.sort((a, b) => a.title.localeCompare(b.title));

    let index = 0;

    return {
      hasNext(): boolean {
        return index < allSongs.length;
      },
      next(): Song {
        return allSongs[index++];
      },
    };
  }

  // Expose genre names for display purposes
  getGenres(): string[] {
    return Array.from(this.genres.keys());
  }
}

// --- Client code ---
// Works with any SongIterator. Doesn't know which playlist type produced it.

function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function printAllSongs(iterator: SongIterator): void {
  let count = 1;
  while (iterator.hasNext()) {
    const song = iterator.next();
    console.log(
      `  ${count}. "${song.title}" by ${song.artist} (${formatDuration(song.duration)})`,
    );
    count++;
  }
}

// --- Usage ---

// Favorites playlist
console.log('=== Favorites ===');
const favorites = new FavoritesPlaylist();
favorites.addSong({
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  duration: 355,
  genre: 'Rock',
});
favorites.addSong({
  title: 'Hotel California',
  artist: 'Eagles',
  duration: 390,
  genre: 'Rock',
});
favorites.addSong({
  title: 'Stairway to Heaven',
  artist: 'Led Zeppelin',
  duration: 482,
  genre: 'Rock',
});
printAllSongs(favorites.createIterator());

// Recently played playlist (circular buffer with 5 slots)
console.log('\n=== Recently Played (circular buffer with 5 slots) ===');
const recent = new RecentlyPlayedPlaylist(5);
recent.addSong({
  title: 'Song A',
  artist: 'Artist1',
  duration: 200,
  genre: 'Pop',
});
recent.addSong({
  title: 'Song B',
  artist: 'Artist2',
  duration: 210,
  genre: 'Pop',
});
recent.addSong({
  title: 'Song C',
  artist: 'Artist3',
  duration: 220,
  genre: 'Pop',
});
recent.addSong({
  title: 'Song D',
  artist: 'Artist4',
  duration: 230,
  genre: 'Pop',
});
recent.addSong({
  title: 'Song E',
  artist: 'Artist5',
  duration: 240,
  genre: 'Pop',
});
// This overwrites Song A (oldest entry)
recent.addSong({
  title: 'Song F',
  artist: 'Artist6',
  duration: 250,
  genre: 'Pop',
});
printAllSongs(recent.createIterator());

// Genre playlist — by genre traversal
console.log('\n=== Genre Playlist (by genre) ===');
const genrePlaylist = new GenrePlaylist();
genrePlaylist.addSong({
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  duration: 355,
  genre: 'Rock',
});
genrePlaylist.addSong({
  title: 'Hotel California',
  artist: 'Eagles',
  duration: 390,
  genre: 'Rock',
});
genrePlaylist.addSong({
  title: 'Take Five',
  artist: 'Dave Brubeck',
  duration: 324,
  genre: 'Jazz',
});
genrePlaylist.addSong({
  title: 'So What',
  artist: 'Miles Davis',
  duration: 562,
  genre: 'Jazz',
});
genrePlaylist.addSong({
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  duration: 200,
  genre: 'Pop',
});
printAllSongs(genrePlaylist.createByGenreIterator());

// Genre playlist — alphabetical traversal
console.log('\n=== Genre Playlist (alphabetical) ===');
printAllSongs(genrePlaylist.createAlphabeticalIterator());
