<script setup>
const useInfo = useState( 'useUser' )
</script>
<template>
	<div>
		<h1>Dashboard</h1>
		<div>
			<ClientOnly>{{ useInfo }}</ClientOnly>
		</div>
	</div>
</template>