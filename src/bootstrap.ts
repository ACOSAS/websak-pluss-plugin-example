import type { Recipient } from '@acos/acos-websak-plugin-api';

const scriptUrl = new URL((<HTMLScriptElement>document.currentScript).src);
const frameUrl = new URL(<string>scriptUrl.searchParams.get('endpoint')).href;

window.pluginHost.then(pluginHost => {
	pluginHost.add({
		type: 'CONTEXTMENU',
		identifier: 'SEARCH',
		label: 'Søk i agresso register',
		icon: 'wsi-search',
		onClick: () => {
			const frame = document.createElement('iframe');
			frame.src = frameUrl;
			frame.style.width = '100%';
			frame.style.border = 'none';
			
			const onMessage = (event: MessageEvent) => {
				if (event.source === frame.contentWindow) {
					if (event.data.submit) {
						window.removeEventListener('message', onMessage);
						dialogRef.close(event.data.recipients);
					}

					if (event.data.resize) {
						frame.style.height = event.data.height;
					}
				}
			};
			window.addEventListener('message', onMessage);

			const dialogRef = pluginHost.openDialog<Recipient[]>('Søk etter kontakt', frame, undefined, {
				width: '80vw',
				disableClose: true,
			});

			return dialogRef.onClosed();
		}
	});
});
