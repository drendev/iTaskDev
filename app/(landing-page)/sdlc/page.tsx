"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScroll, useSpring, useTransform } from "framer-motion";

const SDLC = () => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log("Is in View => ", isInView);
  }, [isInView]);

  const handleClick = () => {
    controls.start("flip");
  };

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress);

  const background = useTransform(scrollYProgress,[0, 0.25, 1],["rgb(86, 1, 245)", "rgb(1, 245, 13)", "rgb(1, 245, 13)"])

  return (
    <>
      <div>
        <motion.div
          style={{
            scaleX,
            background,
            transformOrigin: "left",
            position: "sticky",
            top: 0,
            width: "100%",
            height: "20px",
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            margin: "auto",
            padding: "1.2rem",
          }}
        >
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit
            maecenas tortor fames senectus ex; quisque senectus feugiat. Posuere
            feugiat facilisis lacus rhoncus elementum. Accumsan euismod pretium
            eu blandit taciti. Feugiat vehicula facilisis vivamus, maximus
            cubilia sit. Nostra non commodo pharetra accumsan mattis. Class
            augue imperdiet facilisi nunc integer. Purus dapibus netus ornare
            accumsan velit consequat. Laoreet etiam cubilia est; primis quis
            blandit faucibus ridiculus. Duis quam nascetur quis hac lectus
            cubilia. Odio cubilia proin duis etiam fusce. Pretium quam neque
            lacus nunc varius ligula varius? Posuere porttitor neque aenean
            feugiat consequat, suscipit praesent? Dolor curae potenti facilisis
            amet dignissim odio quisque? Maximus venenatis congue tempus potenti
            cras parturient nulla litora. Habitant nam iaculis efficitur
            malesuada mauris tincidunt scelerisque rhoncus. Viverra in mi elit
            cubilia rhoncus magna varius sit vestibulum. Tristique litora in
            ligula urna tellus adipiscing; feugiat eget tristique. Class
            malesuada ornare tellus hac fames sit bibendum. Convallis eros metus
            suscipit semper; sed conubia enim himenaeos suspendisse. Viverra
            erat vivamus imperdiet consectetur torquent malesuada curabitur
            sapien. Quisque morbi per eu semper nascetur; sodales semper
            vulputate. Sed at congue posuere interdum vitae purus. Pharetra
            potenti hac integer penatibus orci malesuada. Habitant molestie
            pretium interdum; feugiat purus sagittis. Gravida platea curae
            auctor, himenaeos vulputate at luctus. Aenean nec id nascetur;
            habitasse sagittis varius quis duis maecenas. Class vivamus eros
            adipiscing auctor ornare facilisi accumsan himenaeos. Fames molestie
            elementum proin dolor; dapibus bibendum ultricies ligula. Magna
            varius lacus sit rutrum pellentesque netus sed sed. Penatibus donec
            ex volutpat semper finibus augue. Auctor luctus cursus sagittis
            velit iaculis, maecenas feugiat. Sit curabitur ultrices viverra mi
            maximus. Lacinia maecenas mattis suscipit vivamus dis tortor
            porttitor maecenas. Pellentesque torquent suspendisse morbi
            ullamcorper adipiscing dictum. Tellus egestas pharetra netus urna in
            eros inceptos interdum rutrum. Molestie tempus proin quis gravida
            diam vestibulum pharetra nec. Per cubilia praesent nullam lorem
            dolor mi a vehicula. Tempus leo lectus; torquent iaculis duis elit
            erat fusce.
          </p>
        </div>
      </div>
    </>
  );
};

export default SDLC;
