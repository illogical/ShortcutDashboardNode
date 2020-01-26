import React, { useState } from "react";
import { Button } from "./Button";
import { Separator } from "./Separator";
import axios from "axios";
import { ISettings } from "../models/settings";

//TODO: create a service layer
const ip = "192.168.7.25:8080";

export const Layout = () => {
  const [output, setOutput] = useState("");
  const [settings, setSettings] = useState<ISettings>();

  const common = {
    onClick: (keys: string, modifiers: string) => {
      const mods = modifiers ? `?modifers=${modifiers}` : "";
      axios.get(`http://${ip}/send/keys/${keys}${mods}`).then(response => {
        setOutput(`${new Date()}: Sent ${keys} with ${modifiers} mods.`);
      });
    }
  };

  const onClickSettings = () => {
    axios.get(`http://${ip}/settings`).then(response => {
      setSettings(response.data);
      console.log("Successfully got settings.", settings);
    });
  };

  const createInitialJson = () => {
    const keymap: ISettings = {
      colors: {
        background: "#FF000D13",
        buttonText: "#FFD8FFE3",
        buttonBorder: "#FF00151F",
        buttonBackground: "#19D9D9D9",
        buttons: [
          "#FF9240",
          "#648199",
          "#CC4914",
          "#41FFF0",
          "#FF9780",
          "#CCA14B",
          "#999284",
          "#FFAF77",
          "#B6FFF0",
          "#4BCCBD",
          "#6191F2",
          "#00798C",
          "#994926",
          "#BF2E13"
        ]
      },
      applications: ["blender"],
      areas: ["main", "favorites", "recent", "common"],
      filters: ["object", "edit", "sculpt"],
      groups: [
        { title: "Selection", area: "favorites", tags: ["selection"] },
        { title: "Viewport Shading", area: "favorites", tags: ["shading"] },
        { title: "Edit", area: "favorites", tags: ["edit"] },
        { title: "Animation", area: "favorites", tags: ["animation"] },
        { title: "Sculpt", area: "favorites", tags: ["sculpt"] },
        { title: "View", tags: ["view"] },
        { title: "Edges", tags: ["edges"] },
        { title: "Vertices", tags: ["vertices"] },
        { title: "Object", tags: ["object"] },
        { title: "View Direction", tags: ["view-direction"] },
        { title: "Menus", tags: ["menu"] }
      ],
      keymap: {
        buttons: [
          {
            label: "X",
            area: "common",
            app: "blender",
            command: {
              keys: "x"
            }
          },
          {
            label: "Y",
            area: "common",
            app: "blender",
            command: {
              keys: "y"
            }
          },
          {
            label: "Z",
            area: "common",
            app: "blender",
            command: {
              keys: "z"
            }
          },
          {
            label: "Grab",
            area: "common",
            app: "blender",
            command: {
              //TODO: use icon
              keys: "g"
            }
          },
          {
            label: "Scale",
            area: "common",
            app: "blender",
            command: {
              //TODO: use icon

              keys: "s"
            }
          },
          {
            label: "Rotate",
            area: "common",
            app: "blender",
            command: {
              //TODO: use icon

              keys: "r"
            }
          },
          {
            label: "Vertices",
            area: "common",
            app: "blender",
            tags: ["edit", "mode"],
            command: {
              //TODO: use icon
              keys: "1"
            }
          },
          {
            label: "Edges",
            area: "common",
            app: "blender",
            tags: ["edit", "mode"],
            command: {
              //TODO: use icon
              keys: "2"
            }
          },
          {
            label: "Faces",
            area: "common",
            app: "blender",
            tags: ["edit", "mode"],
            command: {
              //TODO: use icon
              keys: "3"
            }
          },
          {
            label: "Undo",
            area: "common",
            app: "blender",
            command: {
              keys: "z",
              mods: "c"
            }
          },
          {
            label: "Redo",
            area: "common",
            app: "blender",
            command: {
              keys: "z",
              mods: "cs"
            }
          },
          {
            label: "History",
            area: "common",
            app: "blender",
            command: {
              keys: "z",
              mods: "ca"
            }
          },
          {
            label: "Delete",
            icon: "fas fa-trash",
            area: "common",
            app: "blender",
            command: {
              keys: "x"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Main
          {
            label: "Enter",
            area: "main",
            app: "blender",
            command: {
              keys: "{ENTER}"
            }
          },
          {
            label: "Escape",
            area: "main",
            app: "blender",
            command: {
              keys: "{ESC}"
            }
          },
          {
            label: "Save",
            area: "main",
            app: "blender",
            command: {
              keys: "s",
              mods: "c"
            }
          },
          {
            label: "Save Copy",
            area: "main",
            app: "blender",
            command: {
              keys: "s",
              mods: "ca"
            }
          },
          {
            label: "Duplicate",
            area: "main",
            app: "blender",
            command: {
              keys: "d",
              mods: "s"
            }
          },
          {
            label: "Duplicate Linked",
            area: "main",
            app: "blender",
            command: {
              keys: "d",
              mods: "a"
            }
          },
          {
            label: "Parent",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              keys: "p",
              mods: "c"
            }
          },
          {
            label: "Join",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              keys: "j",
              mods: "c"
            }
          },
          {
            label: "Reset Cursor",
            area: "main",
            app: "blender",
            command: {
              python: "bpy.ops.view3d.snap_cursor_to_center()"
            }
          },
          {
            label: "Reset Normals",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "n",
              mods: "c"
            }
          },
          {
            label: "Render",
            area: "main",
            app: "blender",

            command: {
              keys: "{F12}"
            }
          },
          {
            label: "Auto Smooth",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              python:
                "C.object.data.use_auto_smooth = True\nC.object.data.auto_smooth_angle = 0.5235987901687622"
            }
          },
          {
            label: "Remote Doubles",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "bpy.ops.mesh.remove_doubles()"
            }
          },
          {
            label: "Select Behind",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "C.space_data.use_occlude_geometry = True"
            }
          },
          {
            label: "Select Front Only",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "C.space_data.use_occlude_geometry = False"
            }
          },
          {
            label: "Make Edge / Face",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "f"
            }
          },
          {
            label: "Skin Resize",
            area: "main",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "a",
              mods: "c"
            }
          },

          /////////////////////////////////////////////////////////////////////////////////// Selection
          {
            label: "Deselect",
            area: "favorites",
            app: "blender",
            tags: ["selection"],
            command: {
              keys: "aa"
            }
          },
          {
            label: "Circle",
            area: "favorites",
            app: "blender",
            tags: ["selection"],
            command: {
              keys: "c"
            }
          },
          {
            label: "Box",
            area: "favorites",
            app: "blender",
            tags: ["selection"],
            command: {
              keys: "b"
            }
          },
          {
            label: "Invert",
            area: "favorites",
            app: "blender",
            tags: ["selection"],
            command: {
              keys: "i"
            }
          },
          {
            label: "Linked",
            area: "favorites",
            app: "blender",
            tags: ["selection"],
            command: {
              keys: "l"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Viewport Shading
          {
            label: "Wireframe",
            area: "favorites",
            app: "blender",
            tags: ["selection", "mode"],
            command: {
              python: "C.space_data.viewport_shade = 'WIREFRAME'"
            }
          },
          {
            label: "Material",
            area: "favorites",
            app: "blender",
            tags: ["selection", "mode"],
            command: {
              python: "C.space_data.viewport_shade = 'MATERIAL'"
            }
          },
          {
            label: "Rendered",
            area: "favorites",
            app: "blender",
            tags: ["selection", "mode"],
            command: {
              python: "C.space_data.viewport_shade = 'RENDERED'"
            }
          },
          {
            label: "Solid",
            area: "favorites",
            app: "blender",
            tags: ["selection", "mode"],
            command: {
              python: "C.space_data.viewport_shade = 'SOLID'"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Edit
          {
            label: "Extrude",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "e"
            }
          },
          {
            label: "Inset",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "i"
            }
          },
          {
            label: "Loop Cut",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              keys: "r"
            }
          },
          {
            label: "Subdivide",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "bpy.ops.mesh.subdivide()"
            }
          },
          {
            label: "Proportional",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "C.scene.tool_settings.proportional_edit = 'ENABLED'"
            }
          },
          {
            label: "Disable Proportional",
            area: "favorites",
            app: "blender",
            tags: ["edit"],
            command: {
              python: "C.scene.tool_settings.proportional_edit = 'DISABLED'"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Animation
          {
            label: "Reset",
            area: "favorites",
            app: "blender",
            tags: ["animation"],
            command: {
              python: "bpy.ops.screen.frame_jump(end=False)"
            }
          },
          {
            label: "Step Back",
            area: "favorites",
            app: "blender",
            tags: ["animation"],
            command: {
              python: ""
            }
          },
          {
            label: "Step Forward",
            area: "favorites",
            app: "blender",
            tags: ["animation"],
            command: {
              python: ""
            }
          },
          {
            label: "Play",
            area: "favorites",
            app: "blender",
            tags: ["animation"],
            command: {
              keys: "a",
              mods: "a"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Sculpt
          {
            label: "Brush Size",
            area: "favorites",
            app: "blender",
            tags: ["sculpt"],
            command: {
              keys: "f"
            }
          },
          {
            label: "Brush Strength",
            area: "favorites",
            app: "blender",
            tags: ["sculpt"],
            command: {
              keys: "f",
              mods: "s"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// View
          {
            label: "View Selected",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              keys: "{NUMPADDOT}"
            }
          },
          {
            label: "View All",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              keys: "{HOME}"
            }
          },
          {
            label: "Hide",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              keys: "h"
            }
          },
          {
            label: "Show All",
            area: "main",
            app: "blender",
            tags: ["view", "object", ""],
            command: {
              keys: "h",
              mods: "a"
            }
          },
          {
            label: "Only Active",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              keys: "{NUMPADDIV}"
            }
          },
          {
            label: "Quad View",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              keys: "q",
              mods: "ca"
            }
          },
          {
            label: "Fullscreen",
            area: "main",
            app: "blender",
            tags: ["view"],
            command: {
              python: "bpy.ops.wm.window_fullscreen_toggle()"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Edges
          {
            label: "Bevel",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              keys: "b",
              mods: "c"
            }
          },
          {
            label: "Mark Sharp",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              python: "bpy.ops.mesh.mark_sharp()"
            }
          },
          {
            label: "Clear Sharp",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              python: "bpy.ops.mesh.mark_sharp(clear=True)"
            }
          },
          {
            label: "Crease",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              python: "bpy.ops.transform.edge_crease()" //TODO:  find why this one was weird
            }
          },
          {
            label: "Mark Seam",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              python: "bpy.ops.mesh.mark_seam(clear=False)"
            }
          },
          {
            label: "Clear Seam",
            area: "main",
            app: "blender",
            tags: ["edges", "edit-group"],
            command: {
              python: "bpy.ops.mesh.mark_seam(clear=True)"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Vertices
          {
            label: "Knife",
            area: "main",
            app: "blender",
            tags: ["vertices", "edit"],
            command: {
              keys: "k"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Object
          {
            label: "Add",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              keys: "a",
              mods: "s"
            }
          },
          {
            label: "Make Smooth",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              python: "bpy.ops.object.shade_smooth()"
            }
          },
          {
            label: "Make Flat",
            area: "main",
            app: "blender",
            tags: ["object"],
            command: {
              python: "bpy.ops.object.shade_flat()"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// View Direction
          {
            label: "Camera",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='CAMERA')"
            }
          },
          {
            label: "Front",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='FRONT')"
            }
          },
          {
            label: "Top",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='TOP')"
            }
          },
          {
            label: "Left",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='LEFT')"
            }
          },
          {
            label: "Back",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='BACK')"
            }
          },
          {
            label: "Right",
            area: "main",
            app: "blender",
            tags: ["view-direction"],
            command: {
              python: "bpy.ops.view3d.viewnumpad(type='RIGHT')"
            }
          },
          {
            label: "Toggle Ortho",
            area: "main",
            app: "blender",
            tags: ["view-direction", "mode"],
            command: {
              python: "bpy.ops.view3d.view_persportho()"
            }
          },
          /////////////////////////////////////////////////////////////////////////////////// Menus
          {
            label: "Vertex",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "v",
              mods: "c"
            }
          },
          {
            label: "Edge",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "e",
              mods: "c"
            }
          },
          {
            label: "Face",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "f",
              mods: "c"
            }
          },
          {
            label: "Specials",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "w"
            }
          },
          {
            label: "Apply",
            area: "main",
            app: "blender",
            tags: ["menu", "object"],
            command: {
              keys: "a",
              mods: "c"
            }
          },
          {
            label: "Snap",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              python: 'bpy.ops.wm.call_menu(name="VIEW3D_MT_snap")'
            }
          },
          {
            label: "Set Origin",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "c",
              mods: "asc"
            }
          },
          {
            label: "Extrude",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "e",
              mods: "c"
            }
          },
          {
            label: "Make Link",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "l",
              mods: "c"
            }
          },
          {
            label: "Separate",
            area: "main",
            app: "blender",
            tags: ["menu", "edit"],
            command: {
              keys: "p"
            }
          },
          {
            label: "Merge",
            area: "main",
            app: "blender",
            tags: ["menu", "edit"],
            command: {
              keys: "m",
              mods: "a"
            }
          },
          {
            label: "Unwrap",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "u"
            }
          },
          {
            label: "Proportional",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              python: "bpy.ops.wm.call_menu(name='VIEW3D_MT_edit_proportional')"
            }
          },
          {
            label: "Pivot Point",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              python: 'bpy.ops.wm.call_menu(name="VIEW3D_MT_Pivot")'
            }
          },
          {
            label: "Convert to",
            area: "main",
            app: "blender",
            tags: ["menu"],
            command: {
              keys: "c",
              mods: "a"
            }
          }
        ]
      }
    };

    console.log(JSON.stringify(keymap));
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <header className="header">HEADER</header>
        <article className="main">
          <div className="container">
            <Button {...common} label="Bounndry Loop" keys="f" modifiers="a" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Functionality" />
            <Button {...common} label="Ah crap" />
            <Button {...common} label="something I am doing here" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Separator text="EDIT" />
            <Button {...common} label="My Button is right Here" />
          </div>
        </article>
        <aside className="aside aside-2">
          RECENT (fixed width?)
          <Button {...common} label="Button5" />
          <Button {...common} label="Button5" />
          <Button {...common} label="Button5" />
          <Button {...common} label="Button5" />
          <Button {...common} label="Button5" />
          <Button {...common} label="Button5" />
        </aside>
        <footer className="footer">
          FAVORITES
          <div className="container">
            <Button label="Create initial JSON" onClick={createInitialJson} />
            <Button label="Get Settings" onClick={onClickSettings} />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
            <Button {...common} label="Button5" />
          </div>
          COMMON {output}
          <div>
            <div className="container">
              <Button {...common} label="X" keys="X" />
              <Button {...common} label="Y" keys="Y" />
              <Button {...common} label="Z" keys="Z" />
              <Button {...common} label="Grab" keys="G" />
              <Button {...common} label="Scale" keys="S" />
              <Button {...common} label="Rotate" keys="R" />
              <Button {...common} label="Vertices" keys="1" />
              <Button {...common} label="Edges" keys="2" />
              <Button {...common} label="Faces" keys="3" />
              <Button {...common} label="Undo" keys="Z" modifiers="c" />
              <Button {...common} label="Redo" keys="Z" modifiers="cs" />
              <Button {...common} label="History" keys="f" modifiers="a" />
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};
