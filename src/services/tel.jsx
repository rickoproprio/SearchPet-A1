async function tel(request) {
  try {
    const response = await fetch(
      `url`
    );
    console.log(response);
    const data = await response.resultado.json();
    console.log(data);
    if (data && data.resultado) {
      const resultado = data.resultado
        .replace(/\n$/, "")
        .replace(/\*|`/g, "")
        .trim();
      return <>{response.json({ resultado: resultado })}</>
    } else {
      return <>{response.json({ resposta: "API demorou para responder" })}</>
    }
  } catch (error) {
    return <><h1>Deu merda</h1></>
  }
}

export default tel;
