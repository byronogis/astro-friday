export interface NavItem {
  /**
   * The display label for the navigation item.
   */
  label: string
  /**
   * The URL or path the navigation item links to.
   */
  link: string
  /**
   * The icon for the navigation item, using [Icônes](https://icones.js.org/) syntax.
   */
  icon?: string
  /**
   * The type of the navigation item, can be 'icon' or omitted for default text link.
   */
  type?: 'icon'
  /**
   * Whether the link is external (opens in a new tab)
   */
  external?: boolean
  /**
   * Control the order of the navigation items
   *
   * Larger numbers appear first
   *
   * @default 0
   */
  order?: number
  /**
   * Whether to hide this navigation item
   *
   * Useful for disabling built-in navs like `post`, `tag`, `series`, `theme-toggle`
   */
  hidden?: boolean
}

export interface ArtConfig {
  /**
   * Weight for selection probability;
   * higher values increase the likelihood of being chosen.
   */
  weight?: number
}

export interface ProjectItem extends Pick<NavItem, 'label' | 'link' | 'icon'> {
  /**
   * A brief description of the project.
   *
   * Also accept HTML to render rich text.
   */
  desc?: string
  /**
   * The category the project belongs to.
   */
  category?: string
}
