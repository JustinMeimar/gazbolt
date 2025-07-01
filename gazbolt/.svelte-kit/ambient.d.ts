
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const SESSION_MANAGER: string;
	export const WINDOWID: string;
	export const QT_ACCESSIBILITY: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const COLORTERM: string;
	export const XDG_CONFIG_DIRS: string;
	export const SSH_AGENT_LAUNCHER: string;
	export const LESS: string;
	export const XDG_MENU_PREFIX: string;
	export const TERM_PROGRAM_VERSION: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const GTK_IM_MODULE: string;
	export const TMUX: string;
	export const MODULAR_HOME: string;
	export const LANGUAGE: string;
	export const NODE: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const SSH_AUTH_SOCK: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const DESKTOP_SESSION: string;
	export const EDITOR: string;
	export const GTK_MODULES: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const GPG_AGENT_INFO: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const WINDOWPATH: string;
	export const HOME: string;
	export const USERNAME: string;
	export const LANG: string;
	export const TMUX_TMPDIR: string;
	export const LS_COLORS: string;
	export const FZF_CTRL_R_OPTS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const NIX_SSL_CERT_FILE: string;
	export const INVOCATION_ID: string;
	export const MANAGERPID: string;
	export const ALACRITTY_SOCKET: string;
	export const npm_lifecycle_script: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const USER: string;
	export const TMUX_PANE: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const ANTLR_JAR: string;
	export const __HM_ZSH_SESS_VARS_SOURCED: string;
	export const PAGER: string;
	export const QT_IM_MODULE: string;
	export const EMSDK_NODE: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const CLASSPATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_package_json: string;
	export const BUN_INSTALL: string;
	export const JOURNAL_STREAM: string;
	export const XDG_DATA_DIRS: string;
	export const ZIG_PATH: string;
	export const ANTLR_INS: string;
	export const PATH: string;
	export const ALACRITTY_LOG: string;
	export const GDMSESSION: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const FZF_DEFAULT_OPTS: string;
	export const EMSDK: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		SESSION_MANAGER: string;
		WINDOWID: string;
		QT_ACCESSIBILITY: string;
		__HM_SESS_VARS_SOURCED: string;
		COLORTERM: string;
		XDG_CONFIG_DIRS: string;
		SSH_AGENT_LAUNCHER: string;
		LESS: string;
		XDG_MENU_PREFIX: string;
		TERM_PROGRAM_VERSION: string;
		GNOME_DESKTOP_SESSION_ID: string;
		GTK_IM_MODULE: string;
		TMUX: string;
		MODULAR_HOME: string;
		LANGUAGE: string;
		NODE: string;
		GNOME_SHELL_SESSION_MODE: string;
		SSH_AUTH_SOCK: string;
		LOCALE_ARCHIVE_2_27: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		DESKTOP_SESSION: string;
		EDITOR: string;
		GTK_MODULES: string;
		PWD: string;
		NIX_PROFILES: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		GPG_AGENT_INFO: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XAUTHORITY: string;
		WINDOWPATH: string;
		HOME: string;
		USERNAME: string;
		LANG: string;
		TMUX_TMPDIR: string;
		LS_COLORS: string;
		FZF_CTRL_R_OPTS: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		NIX_SSL_CERT_FILE: string;
		INVOCATION_ID: string;
		MANAGERPID: string;
		ALACRITTY_SOCKET: string;
		npm_lifecycle_script: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		USER: string;
		TMUX_PANE: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		ANTLR_JAR: string;
		__HM_ZSH_SESS_VARS_SOURCED: string;
		PAGER: string;
		QT_IM_MODULE: string;
		EMSDK_NODE: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		CLASSPATH: string;
		XDG_RUNTIME_DIR: string;
		npm_package_json: string;
		BUN_INSTALL: string;
		JOURNAL_STREAM: string;
		XDG_DATA_DIRS: string;
		ZIG_PATH: string;
		ANTLR_INS: string;
		PATH: string;
		ALACRITTY_LOG: string;
		GDMSESSION: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		FZF_DEFAULT_OPTS: string;
		EMSDK: string;
		ALACRITTY_WINDOW_ID: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		npm_node_execpath: string;
		OLDPWD: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
