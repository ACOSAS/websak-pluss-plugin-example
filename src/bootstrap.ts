import type { Recipient } from '@acos/acos-websak-plugin-api';

const baseUrl = (<HTMLScriptElement>document.currentScript).src;
const frameUrl = new URL('search.html', baseUrl).href
const iconUrl = new URL('icon.svg', baseUrl).href;

window.pluginHost.then(pluginHost => {
	pluginHost.add({
		type: 'CONTEXTMENU',
		identifier: 'SEARCH',
		label: 'Søk i 3. parts tjeneste',
		icon: iconUrl,
		onClick: () => {
			const content = document.createElement('iframe');
			content.src = frameUrl;
			content.style.width = '100%';
			content.style.border = 'none';


			const dialogRef = pluginHost.openDialog<Recipient[]>('Søk etter kontakt', content, undefined, {
				width: '80vw',
				disableClose: true,
			});

			const onMessage = (event: MessageEvent) => {
				if (event.source === content.contentWindow) {
					if (event.data.submit) {
						window.removeEventListener('message', onMessage);
						dialogRef.close([
							{
								name: event.data.name,
								saveContact: false,

								address: event.data.address,
								attention: event.data.attention,
								city: event.data.city,
								countryCode: event.data.countryCode,
								email: event.data.email,
								phoneNumber: event.data.phoneNumber,
								postalCode: event.data.postalCode,
								publicIdentifier: event.data.publicIdentifier,
								reference: event.data.reference,
							}
						]);
					}

					if (event.data.resize) {
						content.style.height = event.data.height;
					}
				}
			};
			window.addEventListener('message', onMessage);

			return dialogRef.onClosed();
		}
	});
});
