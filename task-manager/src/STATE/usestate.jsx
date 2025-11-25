import { useActionState } from "react";

export default function UseActionStateExample() {

  async function submitForm(previousState, formData) {
    // Fake delay to mimic server
    await new Promise((res) => setTimeout(res, 2000));

    // Correct credentials
    const correctUser = "logesh";
    const correctPass = "1234";

    const username = formData.get("username");
    const password = formData.get("password");

    // Check if already logged in
    if (previousState === "Login Success") {
      return "You already logged in!";
    }

    // Validate credentials
    if (username === correctUser && password === correctPass) {
      return "Login Success";
    }

    return "Invalid Credentials";
  }

  const [state, formAction, isPending] = useActionState(submitForm, "");

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>UseActionState Example</h2>

      <form action={formAction}>
        <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>

          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />

          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Show returned message */}
      <p>{state}</p>
    </div>
  );
}
