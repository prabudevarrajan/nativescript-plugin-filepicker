import { Observable } from "tns-core-modules/data/observable";
import { ImageSource } from "tns-core-modules/image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import { View } from "tns-core-modules/ui/core/view/view";

export class FilePicker {

  constructor(options?: Options);

  /**
   * Call this before 'present' to request any additional permissions that may be necessary.
   * In case of failed authorization consider notifying the user for degraded functionality.
   */
  authorize(): Promise<void>;

  /**
   * Present the file picker UI.
   * The result will be an array of SelectedAsset instances provided when the promise is fulfilled.
   */
  present(): Promise<String[]>;
}

/**
 * Provide options for the image picker.
 */
interface Options {
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

/**
 * @param {Options} [options] - options for the image picker.
 * @param {View} [hostView] - [use in iOS] the view that hosts the image picker (e.g. to use when open from a modal page).
 */
export function create(options?: Options, hostView?: View): FilePicker;
