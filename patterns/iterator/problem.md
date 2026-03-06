# Problem: Music Playlist Navigator

## Scenario

You are building a music player application. The app stores playlists internally using different data structures depending on the playlist type. Users should be able to browse songs in any playlist using a consistent interface, regardless of how the playlist is stored.

## Requirements

1. Define a `Song` type with properties: `title`, `artist`, `duration` (in seconds), and `genre`.

2. Implement three playlist types, each using a **different internal data structure**:
   - **FavoritesPlaylist**: Stores songs in a simple array, ordered by the time they were added.
   - **RecentlyPlayedPlaylist**: Stores songs in a fixed-size circular buffer (max 5 songs). When a new song is added beyond capacity, it overwrites the oldest entry.
   - **GenrePlaylist**: Stores songs in a `Map<string, Song[]>` grouped by genre.

3. For each playlist type, create a traversal object that provides two methods:
   - `hasNext(): boolean` — returns true if there are more songs to visit
   - `next(): Song` — returns the next song

4. The `GenrePlaylist` must support two traversal modes:
   - **By genre**: iterates genre by genre, all songs in one genre before moving to the next
   - **Alphabetical**: iterates all songs across genres sorted alphabetically by title

5. Write client code that takes any traversal object and prints all songs. The client code must work identically regardless of which playlist type or traversal mode produced it.

## Expected Behavior

```
=== Favorites ===
1. "Bohemian Rhapsody" by Queen (5:55)
2. "Hotel California" by Eagles (6:30)
3. "Stairway to Heaven" by Led Zeppelin (8:02)

=== Recently Played (circular buffer with 5 slots) ===
1. "Song D" by Artist4
2. "Song E" by Artist5
3. "Song F" by Artist6  (overwrote Song A)

=== Genre Playlist (by genre) ===
[Rock]
1. "Bohemian Rhapsody" by Queen
2. "Hotel California" by Eagles
[Jazz]
3. "Take Five" by Dave Brubeck

=== Genre Playlist (alphabetical) ===
1. "Bohemian Rhapsody" by Queen
2. "Hotel California" by Eagles
3. "Take Five" by Dave Brubeck
```

## Constraints

- The client code that prints songs must not know which playlist type it is iterating over.
- Adding a new playlist type (e.g., ShuffledPlaylist) should only require creating a new class and its traversal logic.
- No playlist should expose its internal data structure to the outside.
