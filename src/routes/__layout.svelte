<script>
	import '../app.css';
</script>
<!-- Made for 100up, designed by Rivage -->
<svelte:head>
	<title>100up: Real-Time Attack Statistics</title>
	<meta name="title" content="100up: Real-Time Attack Statistics" />
	<meta name="description" content="Real-time status of DDoS attack trends" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://attacks.100up.org/" />
	<meta property="og:title" content="100up: Real-time Attack Trends" />
	<meta
		property="og:description"
		content="Real-time status of DDoS attack trends"
	/>
	<meta property="og:image" content="/favicon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://attacks.100up.org/" />
	<meta property="twitter:title" content="100up Attack Statistics" />
	<meta
		property="twitter:description"
		content="Real-time status of DDoS attack trends."
	/>
	<meta property="twitter:image" content="/favicon.png" />
</svelte:head>
<html data-theme="dark" lang='en' class='dark:text-white'>
	<div class="bg-[url('/topography.svg')]">
		<slot></slot>
	</div>
</html>