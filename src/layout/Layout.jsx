import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slidebar from "../components/Slidebar";

export default function Layout() {
  const [menu, setMenu] = useState(true);
  const [updateState, setUpdateState] = useState({
    status: "idle",
    message: "",
    requiredUpdate: false,
  });
  const [updateBusy, setUpdateBusy] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadInitialState = async () => {
      if (!window.desktopAPI?.getUpdateState) return;
      const initial = await window.desktopAPI.getUpdateState();
      if (mounted && initial) {
        setUpdateState((prev) => ({ ...prev, ...initial }));
      }
    };

    loadInitialState();

    if (!window.desktopAPI?.onUpdateStatus) {
      return () => {
        mounted = false;
      };
    }

    const unsubscribe = window.desktopAPI.onUpdateStatus((payload) => {
      if (!mounted || !payload) return;
      setUpdateState((prev) => ({ ...prev, ...payload }));
      if (payload.status === "error" || payload.status === "downloaded") {
        setUpdateBusy(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const startUpdate = async () => {
    if (!window.desktopAPI?.startUpdate) return;
    setUpdateBusy(true);
    const result = await window.desktopAPI.startUpdate();
    if (!result?.ok) {
      setUpdateBusy(false);
    }
  };

  const showUpdateLock = updateState.requiredUpdate;
  const isUpdating =
    updateBusy ||
    updateState.status === "downloading" ||
    updateState.status === "downloaded";

  return (
    <div className="relative flex min-h-screen bg-slate-50">
      <div
        className={`${menu ? "w-64" : "w-20"} relative border-r border-slate-200 bg-white transition-[width] duration-300 ease-out will-change-[width]`}
      >
        <Slidebar collapsed={!menu} />

        <button
          type="button"
          onClick={() => setMenu((prev) => !prev)}
          className="absolute -right-3 top-6 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:text-slate-900"
          aria-label={menu ? "Collapse sidebar" : "Expand sidebar"}
        >
          {menu ? <FiChevronLeft className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {showUpdateLock ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-6 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">Update Required</h2>
            <p className="mt-3 text-sm text-slate-600">
              {updateState.message || "A new update is available. Please update to continue."}
            </p>
            <button
              type="button"
              onClick={startUpdate}
              disabled={isUpdating}
              className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUpdating ? "Updating..." : "Update Now"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
