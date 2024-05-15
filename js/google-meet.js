let mainStageClient;
async function init() {
  const session = await window.meet.addon.createAddonSession({
    cloudProjectNumber: 692069216536,
  });
  console.log("Successfully constructed the add-on session.");
  const mainStageClient = await session.createMainStageClient();
  console.log("Successfully constructed main stage client.");

  document
    .getElementById("load-side-panel")
    .addEventListener("click", async () => {
      await mainStageClient.loadSidePanel();
    });
  document
    .getElementById("unload-side-panel")
    .addEventListener("click", async () => {
      await mainStageClient.unloadSidePanel();
    });
  document
    .getElementById("get-frame-type")
    .addEventListener("click", async () => {
      document.getElementById("frameTypeResultContainer").textContent =
        "Frame type: " + window.meet.addon.getFrameType();
    });
  document
    .getElementById("get-meeting-info")
    .addEventListener("click", async () => {
      document.getElementById("meetingInfoResultContainer").textContent =
        JSON.stringify(await mainStageClient.getMeetingInfo());
    });
  document
    .getElementById("notify-side-panel")
    .addEventListener("click", async () => {
      await mainStageClient.notifySidePanel(
        "Notification from main stage:" + new Date().toLocaleTimeString(),
      );
    });
  document
    .getElementById("set-collaboration-starting-state")
    .addEventListener("click", async () => {
      const sidePanelIframeUrlInputElement =
        document.getElementById("sidePanelIframeUrl");
      const mainStageIframeUrlInputElement =
        document.getElementById("mainStageIframeUrl");
      const additionalDataInputElement =
        document.getElementById("additionalData");
      await mainStageClient.setCollaborationStartingState({
        sidePanelUrl: sidePanelIframeUrlInputElement.value,
        mainStageUrl: mainStageIframeUrlInputElement.value,
        additionalData: additionalDataInputElement.value,
      });
    });
  document
    .getElementById("get-collaboration-starting-state")
    .addEventListener("click", async () => {
      document.getElementById(
        "receivedCollaborationStartingState",
      ).textContent = JSON.stringify(
        await mainStageClient.getCollaborationStartingState(),
      );
    });

  mainStageClient.on("frameToFrameMessage", (arg) => {
    document.getElementById("notificationResultContainer").textContent =
      JSON.stringify(arg);
  });
}
document.body.onload = () => {
  init();
};
