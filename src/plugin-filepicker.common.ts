/**
* Provide options for the image picker.
*/
export interface Options {
  /**
   * Set the picker mode. Supported modes: "single" or "multiple" (default).
   */
  mode?: string;

  /**
   * Set the file extensions eg. ["pdf", "doc"]
   */

  extensions?: string[];

  /**
   * Show internal and removable storage options on Android.
   * Not supported officially, see https://issuetracker.google.com/issues/72053350 |
   */
  showAdvanced?: boolean;

  android?: {
    /**
     * Provide a reason for permission request to access external storage on api levels above 23.
     */
    read_external_storage?: string;
  };
}