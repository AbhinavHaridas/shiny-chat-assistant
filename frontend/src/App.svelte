<script>
   import {marked} from "marked";

   let prompt = "";
   let result = "The response from prompt will appear here";
   let isLoading = false;

   async function onSubmit(e) {
       e.preventDefault();
       if (prompt === "") {
           alert("Please don't give an empty prompt")
       } else {
           isLoading = true;

           const response = await fetch('http://localhost:4000/', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   prompt: prompt
               })
           });

           const json = await response.json();
           result = json['result'];

           isLoading = false;
       }
   }

   $: result = marked(result)
</script>

<main>
    <h1>
        Enter Your prompt
    </h1>
    <form on:submit={onSubmit}>
        <input bind:value={prompt}>
        <button>
            Generate Response
        </button>
    </form>

    <div class="text-area">
        {#if isLoading}
            <p>Loading...</p>
        {:else}
            <p>{@html result}</p>
        {/if}
    </div>
</main>

<style>
    form {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    input {
        padding: 1rem;
        font-size: 1em;
        height: 100%;
        width: 75%;
    }

    button {
        height: 3.6rem;
        width: 25%;
        padding: 1rem;
        background-color: black;
    }

    .text-area {
        margin-top: 2rem;
        padding: 1rem;
        width: 60rem;
        background-color: #716e6e;
        text-align: left;
    }
</style>
