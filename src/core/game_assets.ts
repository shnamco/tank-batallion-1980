// Describes the media source of the game asset,
// can be used to build a game object if it requires
// external media.
export interface GameAsset {
  // for SVG d-paths
  path?: string;
  // for base64-encoded images
  base64?: string;
  fill?: string;
  // side of a bounding rect
  size: number;
}

export const playerTankAsset: GameAsset = {
  // SVG  path:
  path: 'M16 6L16 0L0 0V6H4V8H2L2 18H4V20H0V26H16L16 20H12V18H14V16H16L16 14L22 14V16H26V10H22V12L16 12V10H14V8L12 8V6L16 6Z',
  // Default fill
  fill: '#FFFD54',
  size: 26
};

export const enemyTankAsset: GameAsset = {
  // SVG  path:
  path:
    'M0 26V20H8V18H6V16H4V14H2V12H4V10H6V8H8V6H0V0H20V6H16V8H18V12H22V10H26V16H22V14H18V18H16V20H20V26H0ZM14.0003 18.0001V16.0001H16.0003V10.0001H14.0003V8.00007H10.0003V10.0001H8.00027V12.0001H6.00027V14.0001H8.00027V16.0001H10.0003V18.0001H14.0003Z',
  fill: '#55BEBF',
  size: 26
};

export const WALL_BASE64_SVG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIC8+CiAgPHBhdGggZD0iTTAgMUg0VjYuOTk5OThIMFYxWiIgZmlsbD0iI0FFMjIxNSIgLz4KICA8cGF0aCBkPSJNNiAxSDIwVjYuOTk5OThINlYxWiIgZmlsbD0iI0FFMjIxNSIgLz4KICA8cGF0aCBkPSJNMTIgMTVWOC45OTk5N0gwVjE1SDEyWiIgZmlsbD0iI0FFMjIxNSIgLz4KICA8cGF0aCBkPSJNMTQgOC45OTk5N1YxNUgyOFY4Ljk5OTk3SDE0WiIgZmlsbD0iI0FFMjIxNSIgLz4KICA8cGF0aCBkPSJNMjIgMUgzMlY2Ljk5OTk4SDIyVjFaIiBmaWxsPSIjQUUyMjE1IiAvPgogIDxwYXRoIGQ9Ik0zMiA4Ljk5OTk3SDMwVjE1SDMyVjguOTk5OTdaIiBmaWxsPSIjQUUyMjE1IiAvPgogIDxwYXRoIGQ9Ik00IDE3SDBWMjNINFYxN1oiIGZpbGw9IiNBRTIyMTUiIC8+CiAgPHBhdGggZD0iTTYgMTdWMjNIMjBWMTdINloiIGZpbGw9IiNBRTIyMTUiIC8+CiAgPHBhdGggZD0iTTEyIDI1VjMxSDBWMjVIMTJaIiBmaWxsPSIjQUUyMjE1IiAvPgogIDxwYXRoIGQ9Ik0xNCAyNUgyOFYzMUgxNFYyNVoiIGZpbGw9IiNBRTIyMTUiIC8+CiAgPHBhdGggZD0iTTIyIDE3SDMyVjIzSDIyVjE3WiIgZmlsbD0iI0FFMjIxNSIgLz4KICA8cGF0aCBkPSJNMzIgMjVIMzBWMzFIMzJWMjVaIiBmaWxsPSIjQUUyMjE1IiAvPgo8L3N2Zz4=';

export const SMALL_EXPLOSION_BASE64 =
  'data:image/png;base64,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';

export const BIG_EXPLOSION_BASE64 =
  'data:image/png;base64,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';
