export default function (value) {
  const { dispatch } = this;
  dispatch([{ type: "initLogin", value }]);
}
