export default function () {
  const { dispatch } = this;
  dispatch([{ type: "logout" }]);
}
