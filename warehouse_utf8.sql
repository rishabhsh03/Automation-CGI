--
-- PostgreSQL database dump
--

\restrict Ja1fmolfpMgciFavbY3AorTSEb6YjrFFntiJXOEnjB280CKjtmbgVaETTW002mC

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bom (
    id integer NOT NULL,
    product_id integer,
    version character varying(10) DEFAULT '1.0'::character varying,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bom OWNER TO postgres;

--
-- Name: bom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bom_id_seq OWNER TO postgres;

--
-- Name: bom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bom_id_seq OWNED BY public.bom.id;


--
-- Name: bom_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bom_items (
    id integer NOT NULL,
    bom_id integer,
    component_product_id integer,
    quantity_required numeric NOT NULL,
    unit character varying(20),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bom_items OWNER TO postgres;

--
-- Name: bom_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bom_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bom_items_id_seq OWNER TO postgres;

--
-- Name: bom_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bom_items_id_seq OWNED BY public.bom_items.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    product_id integer NOT NULL,
    location_id integer NOT NULL,
    quantity integer NOT NULL,
    organization_id integer,
    reserved_quantity integer DEFAULT 0,
    available_quantity integer DEFAULT 0,
    damaged_quantity integer DEFAULT 0,
    reorder_level integer DEFAULT 0,
    reorder_quantity integer DEFAULT 0,
    unit_cost numeric(12,2),
    selling_price numeric(12,2),
    status character varying(30) DEFAULT 'Available'::character varying,
    last_stock_in timestamp without time zone,
    last_stock_out timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_id_seq OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    warehouse_id integer NOT NULL,
    asile character varying(10),
    rack character varying(10),
    bin character varying(10),
    organization_id integer
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: master_material; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_material (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(50) NOT NULL
);


ALTER TABLE public.master_material OWNER TO postgres;

--
-- Name: master_material_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_material_id_seq OWNER TO postgres;

--
-- Name: master_material_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_material_id_seq OWNED BY public.master_material.id;


--
-- Name: orderitems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderitems (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    organization_id integer,
    unit_price numeric(12,2) DEFAULT 0 NOT NULL,
    total_price numeric(12,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.orderitems OWNER TO postgres;

--
-- Name: orderitems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orderitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orderitems_id_seq OWNER TO postgres;

--
-- Name: orderitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orderitems_id_seq OWNED BY public.orderitems.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    organization_id integer,
    total_amount numeric(12,2),
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying, 'CANCELLED'::character varying])::text[])))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(100) NOT NULL,
    plan character varying(20) DEFAULT 'trial'::character varying,
    subscription_status character varying(20) DEFAULT 'trial'::character varying,
    stripe_customer_id character varying(100),
    stripe_subscription_id character varying(100),
    trial_end_at timestamp without time zone,
    max_users integer DEFAULT 5,
    max_warehouses integer DEFAULT 1,
    max_skus integer DEFAULT 100,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: otp_verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_verification (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    otp character varying(6) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.otp_verification OWNER TO postgres;

--
-- Name: otp_verification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otp_verification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otp_verification_id_seq OWNER TO postgres;

--
-- Name: otp_verification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.otp_verification_id_seq OWNED BY public.otp_verification.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    sku character varying(50) NOT NULL,
    name character varying(50),
    category character varying(50),
    reorder_threshold integer NOT NULL,
    reorder_qty integer NOT NULL,
    product_type character varying(20) DEFAULT 'standard'::character varying,
    organization_id integer,
    specs jsonb,
    purchase_price numeric(10,2),
    selling_price numeric(10,2)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: purchaseorderitems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchaseorderitems (
    id integer NOT NULL,
    purchase_order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_cost numeric(10,2) NOT NULL,
    subtotal numeric(12,2) NOT NULL,
    received_quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.purchaseorderitems OWNER TO postgres;

--
-- Name: purchaseorderitems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchaseorderitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchaseorderitems_id_seq OWNER TO postgres;

--
-- Name: purchaseorderitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchaseorderitems_id_seq OWNED BY public.purchaseorderitems.id;


--
-- Name: purchaseorders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchaseorders (
    id integer NOT NULL,
    supplier_id integer NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    organization_id integer,
    unit_cost numeric(10,2),
    total_amount numeric(12,2),
    received_at timestamp without time zone,
    CONSTRAINT purchaseorders_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'APPROVED'::character varying, 'DELIVERED'::character varying])::text[])))
);


ALTER TABLE public.purchaseorders OWNER TO postgres;

--
-- Name: purchaseorders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchaseorders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchaseorders_id_seq OWNER TO postgres;

--
-- Name: purchaseorders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchaseorders_id_seq OWNED BY public.purchaseorders.id;


--
-- Name: stockmovements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stockmovements (
    id integer NOT NULL,
    product_id integer NOT NULL,
    location_id integer NOT NULL,
    type character varying(50) NOT NULL,
    quantity integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    organization_id integer,
    order_id integer,
    CONSTRAINT stockmovements_type_check CHECK (((type)::text = ANY ((ARRAY['IN'::character varying, 'OUT'::character varying, 'TRANSFER'::character varying])::text[])))
);


ALTER TABLE public.stockmovements OWNER TO postgres;

--
-- Name: stockmovements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stockmovements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stockmovements_id_seq OWNER TO postgres;

--
-- Name: stockmovements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stockmovements_id_seq OWNED BY public.stockmovements.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    contact_info character varying(255),
    avg_delivery_date integer NOT NULL,
    organization_id integer
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    role character varying(20) NOT NULL,
    organization_id integer,
    email character varying(255),
    password character varying(255),
    phone text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.warehouses (
    id integer NOT NULL,
    name character varying(20),
    address text,
    organization_id integer
);


ALTER TABLE public.warehouses OWNER TO postgres;

--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.warehouses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouses_id_seq OWNER TO postgres;

--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.warehouses_id_seq OWNED BY public.warehouses.id;


--
-- Name: bom id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom ALTER COLUMN id SET DEFAULT nextval('public.bom_id_seq'::regclass);


--
-- Name: bom_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom_items ALTER COLUMN id SET DEFAULT nextval('public.bom_items_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: master_material id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_material ALTER COLUMN id SET DEFAULT nextval('public.master_material_id_seq'::regclass);


--
-- Name: orderitems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems ALTER COLUMN id SET DEFAULT nextval('public.orderitems_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: otp_verification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_verification ALTER COLUMN id SET DEFAULT nextval('public.otp_verification_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: purchaseorderitems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorderitems ALTER COLUMN id SET DEFAULT nextval('public.purchaseorderitems_id_seq'::regclass);


--
-- Name: purchaseorders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorders ALTER COLUMN id SET DEFAULT nextval('public.purchaseorders_id_seq'::regclass);


--
-- Name: stockmovements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements ALTER COLUMN id SET DEFAULT nextval('public.stockmovements_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses ALTER COLUMN id SET DEFAULT nextval('public.warehouses_id_seq'::regclass);


--
-- Data for Name: bom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bom (id, product_id, version, is_active, created_at) FROM stdin;
\.


--
-- Data for Name: bom_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bom_items (id, bom_id, component_product_id, quantity_required, unit, created_at) FROM stdin;
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, product_id, location_id, quantity, organization_id, reserved_quantity, available_quantity, damaged_quantity, reorder_level, reorder_quantity, unit_cost, selling_price, status, last_stock_in, last_stock_out, created_at, updated_at) FROM stdin;
10	1	10	45	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
11	2	10	20	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
12	3	11	15	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
14	5	12	35	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
15	6	13	25	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
16	7	13	18	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
17	8	14	12	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
18	9	14	50	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
19	10	15	30	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
20	11	16	28	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
22	13	17	22	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
23	14	17	40	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
24	15	18	16	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
13	4	11	2200	1	0	0	0	0	0	\N	\N	Available	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
54	1	10	120	1	15	105	0	20	50	13500.00	16500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
55	2	10	90	1	10	80	0	20	50	15000.00	18000.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
56	3	11	40	1	5	35	0	10	20	28500.00	33000.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
57	4	11	35	1	2	33	0	10	20	24500.00	29000.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
58	5	12	150	1	20	130	2	40	80	3200.00	4200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
59	6	12	140	1	15	125	1	40	80	3100.00	4100.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
60	7	13	75	1	10	65	0	20	40	6200.00	7600.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
61	8	13	60	1	5	55	0	15	30	5200.00	6500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
62	9	14	95	1	8	87	0	20	40	6200.00	7800.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
63	10	14	85	1	5	80	0	20	40	4800.00	6200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
64	11	15	130	1	20	110	3	30	60	2900.00	3800.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
65	12	15	70	1	5	65	0	20	40	9800.00	11800.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
66	13	16	55	1	4	51	0	15	30	2500.00	3400.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
67	14	16	45	1	5	40	0	15	30	4200.00	5200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
68	15	17	50	1	5	45	0	10	20	8500.00	10400.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
69	16	17	45	1	5	40	0	10	20	9800.00	11900.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
70	17	18	30	1	2	28	0	10	20	12000.00	14500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
71	18	10	110	1	12	98	1	30	60	3200.00	4500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
72	19	11	95	1	10	85	0	20	40	4800.00	6200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
73	20	12	80	1	6	74	0	20	40	6200.00	7900.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
74	21	13	40	1	4	36	0	10	20	4200.00	5600.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
75	22	14	35	1	3	32	0	10	20	5200.00	6800.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
76	23	15	28	1	2	26	0	10	20	6100.00	7600.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
77	24	16	200	1	25	175	5	50	100	450.00	650.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
78	25	17	180	1	20	160	2	50	100	1800.00	2400.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
79	26	18	32	1	2	30	0	10	20	7200.00	9200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
80	27	10	18	1	3	15	0	10	20	11000.00	14500.00	Low Stock	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
81	30	11	120	1	10	110	0	20	50	450.00	700.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
82	31	12	90	1	5	85	0	20	40	1800.00	2500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
83	32	13	60	1	4	56	0	15	30	5200.00	6500.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
84	33	14	140	1	15	125	2	30	60	450.00	750.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
85	34	15	90	1	8	82	0	20	40	1200.00	1800.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
86	35	16	160	1	20	140	1	40	80	350.00	650.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
87	36	17	70	1	6	64	0	20	40	1800.00	2600.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
88	37	18	65	1	5	60	0	20	40	4200.00	5200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
89	38	10	85	1	10	75	0	20	40	1500.00	2200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
90	39	11	55	1	5	50	0	15	30	4200.00	5200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
91	40	12	35	1	3	32	0	10	20	5800.00	7200.00	Available	2026-07-21 14:13:51.652561	\N	2026-07-21 14:13:51.652561	2026-07-21 14:13:51.652561
92	41	13	60	1	5	55	0	15	30	2800.00	3600.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
93	42	14	45	1	3	42	0	10	20	4200.00	5300.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
94	43	15	90	1	10	80	0	20	40	1800.00	2600.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
95	44	16	55	1	5	50	0	15	30	5200.00	6900.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
96	45	17	80	1	6	74	0	20	40	2400.00	3400.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
97	46	18	150	1	20	130	2	40	80	550.00	850.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
98	47	10	120	1	15	105	1	30	60	1200.00	1800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
21	12	16	80	1	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	2026-07-21 07:15:50.435566	2026-07-21 07:15:50.435566
99	48	11	180	1	20	160	5	50	100	650.00	950.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
100	49	12	220	1	15	205	0	60	120	180.00	350.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
101	50	13	180	1	10	170	0	50	100	250.00	500.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
102	51	14	35	1	3	32	0	10	20	28500.00	34500.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
103	52	15	28	1	2	26	0	10	20	29500.00	36000.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
104	53	16	18	1	2	16	0	8	15	52000.00	62000.00	Low Stock	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
105	54	17	15	1	2	13	0	8	15	49000.00	59000.00	Low Stock	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
106	55	18	70	1	6	64	0	20	40	11500.00	14500.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
107	56	10	60	1	5	55	0	20	40	9800.00	12800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
108	57	11	45	1	4	41	0	15	30	12800.00	15800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
109	58	12	55	1	5	50	0	15	30	7600.00	9800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
110	59	13	20	1	2	18	0	10	20	8500.00	10800.00	Low Stock	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
111	60	14	18	1	2	16	0	10	20	9800.00	12400.00	Low Stock	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
112	61	15	40	1	4	36	0	12	25	12800.00	15800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
113	62	16	25	1	2	23	0	10	20	18500.00	22800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
114	63	17	80	1	8	72	0	20	40	7800.00	9800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
115	64	18	65	1	5	60	0	20	40	9800.00	12200.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
116	65	10	32	1	3	29	0	10	20	6800.00	8500.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
117	66	11	28	1	2	26	0	10	20	7200.00	9200.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
119	68	13	30	1	3	27	0	10	20	8500.00	10900.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
120	69	14	50	1	4	46	0	15	30	6200.00	7900.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
121	70	15	42	1	3	39	0	12	25	5200.00	6900.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
122	71	16	75	1	5	70	0	20	40	4200.00	5600.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
123	72	17	60	1	4	56	0	15	30	3500.00	4900.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
124	73	18	90	1	8	82	0	20	40	2200.00	3200.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
125	74	10	110	1	10	100	0	25	50	1200.00	1800.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
126	75	11	35	1	3	32	0	10	20	5800.00	7400.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
127	76	12	40	1	3	37	0	10	20	4200.00	5600.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
128	77	13	22	1	2	20	0	10	20	9500.00	11800.00	Low Stock	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
129	78	14	38	1	3	35	0	10	20	4800.00	6200.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
130	79	15	160	1	15	145	2	40	80	1800.00	2600.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
131	80	16	190	1	20	170	0	50	100	450.00	850.00	Available	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
118	67	12	1	1	\N	21	\N	\N	\N	\N	\N	\N	2026-07-21 14:14:31.040785	\N	2026-07-21 14:14:31.040785	2026-07-21 14:14:31.040785
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, warehouse_id, asile, rack, bin, organization_id) FROM stdin;
10	4	A	R1	B1	1
11	4	A	R2	B1	1
12	4	A	R3	B1	1
13	5	B	R1	B1	1
14	5	B	R2	B1	1
15	5	B	R3	B1	1
16	6	C	R1	B1	1
17	6	C	R2	B1	1
18	6	C	R3	B1	1
\.


--
-- Data for Name: master_material; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_material (id, name, category) FROM stdin;
\.


--
-- Data for Name: orderitems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orderitems (id, order_id, product_id, quantity, organization_id, unit_price, total_price) FROM stdin;
3	4	1	2	1	25000.00	50000.00
4	4	3	1	1	35000.00	35000.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, customer_id, status, created_at, organization_id, total_amount) FROM stdin;
4	1	PENDING	2026-07-21 10:52:57.056093	1	85000.00
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, name, slug, plan, subscription_status, stripe_customer_id, stripe_subscription_id, trial_end_at, max_users, max_warehouses, max_skus, is_active, created_at, updated_at) FROM stdin;
1	CGI Warehouse	cgi-warehouse	trial	trial	\N	\N	\N	5	1	100	t	2026-07-17 11:58:21.647043	2026-07-17 11:58:21.647043
2	CGI Warehouse	cgi-warehouse	trial	trial	\N	\N	\N	5	1	100	t	2026-07-17 12:00:58.75041	2026-07-17 12:00:58.75041
\.


--
-- Data for Name: otp_verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp_verification (id, email, otp, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, sku, name, category, reorder_threshold, reorder_qty, product_type, organization_id, specs, purchase_price, selling_price) FROM stdin;
137	MIC-130	Blue Yeti X USB Microphone	Microphone	10	20	Hardware	1	\N	\N	\N
138	NET-131	Cisco Catalyst 9200 Switch	Networking	5	10	Hardware	1	\N	\N	\N
139	NET-132	Ubiquiti UniFi U6 Lite Access Point	Networking	8	15	Hardware	1	\N	\N	\N
140	NET-133	TP-Link Omada Access Point	Networking	8	15	Hardware	1	\N	\N	\N
141	NET-134	MikroTik RB4011 Router	Networking	5	10	Hardware	1	\N	\N	\N
142	NET-135	Cisco RV340 Router	Networking	5	10	Hardware	1	\N	\N	\N
143	SSD-136	Samsung T7 Portable SSD 1TB	Storage	15	30	Hardware	1	\N	\N	\N
144	SSD-137	SanDisk Extreme Portable SSD 2TB	Storage	15	30	Hardware	1	\N	\N	\N
145	SSD-138	Kingston XS2000 2TB	Storage	15	30	Hardware	1	\N	\N	\N
146	SSD-139	WD My Passport SSD 2TB	Storage	15	30	Hardware	1	\N	\N	\N
147	SSD-140	Crucial X10 Pro 2TB	Storage	15	30	Hardware	1	\N	\N	\N
148	MON-141	Dell UltraSharp U2723QE	Monitor	8	15	Hardware	1	\N	\N	\N
149	MON-142	Samsung Smart Monitor M8	Monitor	8	15	Hardware	1	\N	\N	\N
150	MON-143	LG 34WN80C Ultrawide	Monitor	8	15	Hardware	1	\N	\N	\N
151	MON-144	AOC 24G2 Gaming Monitor	Monitor	8	15	Hardware	1	\N	\N	\N
152	MON-145	MSI G321Q Gaming Monitor	Monitor	8	15	Hardware	1	\N	\N	\N
153	KEY-146	Logitech MX Mechanical	Keyboard	15	30	Hardware	1	\N	\N	\N
154	KEY-147	SteelSeries Apex Pro	Keyboard	15	30	Hardware	1	\N	\N	\N
155	KEY-148	Razer Huntsman V3	Keyboard	15	30	Hardware	1	\N	\N	\N
156	KEY-149	Corsair K70 RGB Pro	Keyboard	15	30	Hardware	1	\N	\N	\N
157	KEY-150	HyperX Alloy Origins	Keyboard	15	30	Hardware	1	\N	\N	\N
158	MOU-151	Logitech Lift Vertical Mouse	Mouse	20	40	Hardware	1	\N	\N	\N
159	MOU-152	SteelSeries Prime Wireless	Mouse	20	40	Hardware	1	\N	\N	\N
160	MOU-153	Corsair M65 RGB Elite	Mouse	20	40	Hardware	1	\N	\N	\N
161	MOU-154	HyperX Pulsefire Haste	Mouse	20	40	Hardware	1	\N	\N	\N
162	MOU-155	Glorious Model O	Mouse	20	40	Hardware	1	\N	\N	\N
163	HEAD-156	Sony WH-CH720N	Headset	10	20	Hardware	1	\N	\N	\N
164	HEAD-157	JBL Quantum 400	Headset	10	20	Hardware	1	\N	\N	\N
165	HEAD-158	Corsair HS80 RGB	Headset	10	20	Hardware	1	\N	\N	\N
166	HEAD-159	Logitech G733 Lightspeed	Headset	10	20	Hardware	1	\N	\N	\N
167	HEAD-160	HyperX Cloud III	Headset	10	20	Hardware	1	\N	\N	\N
168	UPS-161	APC Smart UPS 1500VA	UPS	5	10	Hardware	1	\N	\N	\N
169	UPS-162	CyberPower 1500VA UPS	UPS	5	10	Hardware	1	\N	\N	\N
170	UPS-163	Numeric Digital 1000VA UPS	UPS	5	10	Hardware	1	\N	\N	\N
171	UPS-164	Eaton 5E 1100VA UPS	UPS	5	10	Hardware	1	\N	\N	\N
172	UPS-165	Vertiv Liebert UPS	UPS	5	10	Hardware	1	\N	\N	\N
173	ACC-166	USB 3.0 Hub 7 Port	Accessories	20	40	Hardware	1	\N	\N	\N
174	ACC-167	USB-C Docking Station	Accessories	15	30	Hardware	1	\N	\N	\N
175	ACC-168	Laptop Cooling Pad	Accessories	20	40	Hardware	1	\N	\N	\N
176	ACC-169	HDMI Splitter 4 Port	Accessories	20	40	Hardware	1	\N	\N	\N
177	ACC-170	DisplayPort to HDMI Adapter	Accessories	20	40	Hardware	1	\N	\N	\N
178	CAB-171	CAT6 Ethernet Cable 10m	Cable	30	60	Hardware	1	\N	\N	\N
179	CAB-172	CAT6 Ethernet Cable 20m	Cable	30	60	Hardware	1	\N	\N	\N
180	CAB-173	USB-C Charging Cable 2m	Cable	40	80	Hardware	1	\N	\N	\N
181	CAB-174	Lightning Cable 2m	Cable	40	80	Hardware	1	\N	\N	\N
182	CAB-175	HDMI 2.1 Cable 5m	Cable	30	60	Hardware	1	\N	\N	\N
183	PRN-176	HP LaserJet Pro MFP	Printer	5	10	Hardware	1	\N	\N	\N
184	PRN-177	Canon PIXMA G3770	Printer	5	10	Hardware	1	\N	\N	\N
185	PRN-178	Brother HL-L2460DW	Printer	5	10	Hardware	1	\N	\N	\N
186	SCN-179	Epson Workforce Scanner	Scanner	5	10	Hardware	1	\N	\N	\N
187	PROJ-180	BenQ TH575 Projector	Projector	5	10	Hardware	1	\N	\N	\N
1	CPU-001	Intel Core i5-12400F	CPU	5	10	standard	1	\N	16000.00	19000.00
3	GPU-001	NVIDIA RTX 4060 8GB	GPU	4	8	standard	1	\N	28000.00	33000.00
4	GPU-002	AMD Radeon RX 7600	GPU	3	6	standard	1	\N	25000.00	30000.00
5	RAM-001	Corsair Vengeance 16GB DDR4	RAM	8	20	standard	1	\N	2500.00	3200.00
2	CPU-002	AMD Ryzen 5 5600X	CPU	6	12	standard	1	\N	18000.00	22000.00
6	RAM-002	Kingston Fury Beast 16GB DDR4	RAM	6	15	standard	1	\N	\N	\N
7	RAM-003	G.Skill Ripjaws V 32GB DDR4	RAM	5	10	standard	1	\N	\N	\N
8	RAM-004	Crucial 16GB DDR5	RAM	7	18	standard	1	\N	\N	\N
9	SSD-001	Samsung 970 EVO Plus 1TB	SSD	5	10	standard	1	\N	\N	\N
10	SSD-002	WD Blue SN570 1TB	SSD	6	12	standard	1	\N	\N	\N
11	SSD-003	Crucial P3 500GB	SSD	8	15	standard	1	\N	\N	\N
12	SSD-004	Kingston NV2 2TB	SSD	4	8	standard	1	\N	\N	\N
13	HDD-001	Seagate Barracuda 1TB	HDD	5	10	standard	1	\N	\N	\N
14	HDD-002	WD Blue 2TB	HDD	4	8	standard	1	\N	\N	\N
15	MB-001	MSI B550M Pro	Motherboard	4	8	standard	1	\N	\N	\N
16	MB-002	ASUS Prime B660M-A	Motherboard	5	10	standard	1	\N	\N	\N
17	MB-003	Gigabyte B760 Gaming X	Motherboard	3	6	standard	1	\N	\N	\N
18	PSU-001	Corsair CX550 550W	Power Supply	6	12	standard	1	\N	\N	\N
19	PSU-002	Cooler Master MWE 650W	Power Supply	5	10	standard	1	\N	\N	\N
20	PSU-003	DeepCool PK750D 750W	Power Supply	4	8	standard	1	\N	\N	\N
21	CASE-001	NZXT H510	Cabinet	3	6	standard	1	\N	\N	\N
22	CASE-002	Corsair 4000D Airflow	Cabinet	4	8	standard	1	\N	\N	\N
23	CASE-003	Cooler Master TD500	Cabinet	3	6	standard	1	\N	\N	\N
24	FAN-001	Cooler Master 120mm RGB Fan	Cooling	10	25	standard	1	\N	\N	\N
25	FAN-002	Noctua NF-A12x25	Cooling	6	15	standard	1	\N	\N	\N
26	AIO-001	DeepCool LS520 Liquid Cooler	Cooling	4	8	standard	1	\N	\N	\N
27	MON-001	LG UltraGear 24 Inch	Monitor	4	8	standard	1	\N	\N	\N
30	KB-001	Logitech K120 Keyboard	Keyboard	10	30	standard	1	\N	\N	\N
31	KB-002	Redragon K552 Mechanical Keyboard	Keyboard	6	15	standard	1	\N	\N	\N
32	KB-003	Keychron K2 Wireless Keyboard	Keyboard	5	10	standard	1	\N	\N	\N
33	MS-001	Logitech G102 Mouse	Mouse	12	30	standard	1	\N	\N	\N
34	MS-002	Razer DeathAdder Essential	Mouse	8	20	standard	1	\N	\N	\N
35	MS-003	HP Wireless Mouse X200	Mouse	10	25	standard	1	\N	\N	\N
36	HS-001	HyperX Cloud Stinger	Headset	5	10	standard	1	\N	\N	\N
37	HS-002	Logitech G435 Wireless	Headset	4	8	standard	1	\N	\N	\N
38	SPK-001	Creative Pebble V2	Speakers	5	12	standard	1	\N	\N	\N
39	WC-001	Logitech C920 HD Webcam	Webcam	4	8	standard	1	\N	\N	\N
40	MIC-001	Blue Snowball USB Microphone	Microphone	4	8	standard	1	\N	\N	\N
41	UPS-001	APC 600VA UPS	UPS	3	6	standard	1	\N	\N	\N
42	UPS-002	Zebronics 1000VA UPS	UPS	3	6	standard	1	\N	\N	\N
43	RTR-001	TP-Link Archer C6 Router	Networking	5	10	standard	1	\N	\N	\N
44	RTR-002	ASUS RT-AX55 WiFi 6 Router	Networking	4	8	standard	1	\N	\N	\N
45	SW-001	TP-Link 8 Port Gigabit Switch	Networking	4	8	standard	1	\N	\N	\N
46	PD-001	SanDisk 64GB Pen Drive	Storage	10	30	standard	1	\N	\N	\N
47	PD-002	Samsung BAR Plus 128GB	Storage	8	20	standard	1	\N	\N	\N
48	CARD-001	SanDisk 128GB microSD Card	Storage	8	20	standard	1	\N	\N	\N
49	CBL-001	HDMI 2.1 Cable 2 Meter	Accessories	15	40	standard	1	\N	\N	\N
50	CBL-002	USB Type-C to Type-C Cable	Accessories	20	50	standard	1	\N	\N	\N
51	CPU-003	Intel Core i7-13700K	CPU	4	8	standard	1	\N	\N	\N
52	CPU-004	AMD Ryzen 7 7700X	CPU	5	10	standard	1	\N	\N	\N
53	GPU-003	NVIDIA RTX 4070 Super	GPU	3	6	standard	1	\N	\N	\N
54	GPU-004	AMD Radeon RX 7800 XT	GPU	4	8	standard	1	\N	\N	\N
55	RAM-005	Corsair Dominator Platinum 32GB DDR5	RAM	4	8	standard	1	\N	\N	\N
56	RAM-006	Kingston Fury Beast 32GB DDR5	RAM	5	10	standard	1	\N	\N	\N
57	SSD-005	Samsung 990 Pro 2TB	SSD	3	6	standard	1	\N	\N	\N
58	SSD-006	Crucial T500 1TB	SSD	4	8	standard	1	\N	\N	\N
59	HDD-003	Seagate IronWolf 4TB	HDD	3	6	standard	1	\N	\N	\N
60	HDD-004	WD Red Plus 6TB	HDD	2	4	standard	1	\N	\N	\N
61	MB-004	ASRock B650M Pro RS	Motherboard	4	8	standard	1	\N	\N	\N
62	MB-005	MSI MAG Z790 Tomahawk	Motherboard	3	6	standard	1	\N	\N	\N
63	PSU-004	Corsair RM750e 750W	Power Supply	4	8	standard	1	\N	\N	\N
64	PSU-005	MSI MAG A850GL 850W	Power Supply	3	6	standard	1	\N	\N	\N
65	CASE-004	Lian Li Lancool 216	Cabinet	3	6	standard	1	\N	\N	\N
66	CASE-005	Fractal Design Pop Air	Cabinet	4	8	standard	1	\N	\N	\N
67	MON-004	Acer Nitro VG240Y	Monitor	5	10	standard	1	\N	\N	\N
68	MON-005	BenQ GW2780	Monitor	4	8	standard	1	\N	\N	\N
69	KB-004	Logitech MX Keys S	Keyboard	4	8	standard	1	\N	\N	\N
70	KB-005	Royal Kludge RK84	Keyboard	5	10	standard	1	\N	\N	\N
71	MS-004	Logitech MX Master 3S	Mouse	4	8	standard	1	\N	\N	\N
72	MS-005	Razer Basilisk V3	Mouse	5	10	standard	1	\N	\N	\N
73	HS-003	SteelSeries Arctis Nova 1	Headset	3	6	standard	1	\N	\N	\N
74	SPK-002	Logitech Z213 Speakers	Speakers	4	8	standard	1	\N	\N	\N
75	WC-002	Razer Kiyo Webcam	Webcam	3	6	standard	1	\N	\N	\N
76	MIC-002	HyperX SoloCast USB Microphone	Microphone	4	8	standard	1	\N	\N	\N
77	RTR-003	Netgear Nighthawk AX3000	Networking	3	6	standard	1	\N	\N	\N
78	SW-002	D-Link 16 Port Gigabit Switch	Networking	3	6	standard	1	\N	\N	\N
79	PD-003	Kingston DataTraveler Exodia 256GB	Storage	6	15	standard	1	\N	\N	\N
80	CBL-003	DisplayPort 1.4 Cable 2 Meter	Accessories	10	25	standard	1	\N	\N	\N
83	GPU-005	NVIDIA RTX 4080 Super	GPU	2	4	standard	1	\N	\N	\N
84	GPU-006	AMD Radeon RX 7900 XTX	GPU	2	4	standard	1	\N	\N	\N
85	RAM-007	ADATA XPG Lancer 32GB DDR5	RAM	5	10	standard	1	\N	\N	\N
86	RAM-008	TeamGroup T-Force Delta RGB 16GB	RAM	6	12	standard	1	\N	\N	\N
87	SSD-007	WD Black SN850X 2TB	SSD	4	8	standard	1	\N	\N	\N
88	SSD-008	Kingston KC3000 1TB	SSD	5	10	standard	1	\N	\N	\N
90	HDD-006	Seagate SkyHawk 4TB	HDD	4	8	standard	1	\N	\N	\N
91	MB-006	Gigabyte X670 Aorus Elite	Motherboard	3	6	standard	1	\N	\N	\N
92	MB-007	ASUS ROG Strix B650E-F	Motherboard	3	6	standard	1	\N	\N	\N
93	PSU-006	Cooler Master GX850 Gold	Power Supply	4	8	standard	1	\N	\N	\N
94	PSU-007	NZXT C850 Gold	Power Supply	3	6	standard	1	\N	\N	\N
95	CASE-006	NZXT H9 Flow	Cabinet	2	5	standard	1	\N	\N	\N
96	CASE-007	Corsair iCUE 5000X RGB	Cabinet	3	6	standard	1	\N	\N	\N
97	MON-006	MSI G274QPF-QD 27 Inch	Monitor	3	6	standard	1	\N	\N	\N
98	MON-007	ASUS TUF VG27AQ	Monitor	4	8	standard	1	\N	\N	\N
99	KB-006	Logitech G Pro X Keyboard	Keyboard	4	8	standard	1	\N	\N	\N
100	KB-007	Razer BlackWidow V4	Keyboard	3	6	standard	1	\N	\N	\N
101	MS-006	Corsair Harpoon RGB Pro	Mouse	6	12	standard	1	\N	\N	\N
102	MS-007	SteelSeries Rival 3	Mouse	5	10	standard	1	\N	\N	\N
103	HS-004	Corsair HS55 Stereo	Headset	5	10	standard	1	\N	\N	\N
104	HS-005	Razer Kraken X	Headset	4	8	standard	1	\N	\N	\N
105	WC-003	Logitech Brio 4K Webcam	Webcam	3	6	standard	1	\N	\N	\N
113	CPU-106	AMD Ryzen 9 9900X	CPU	10	20	Hardware	1	\N	\N	\N
114	CPU-107	Intel Core Ultra 7 265K	CPU	10	20	Hardware	1	\N	\N	\N
115	GPU-108	NVIDIA RTX 5070 12GB	GPU	8	15	Hardware	1	\N	\N	\N
116	GPU-109	AMD Radeon RX 8800 XT	GPU	8	15	Hardware	1	\N	\N	\N
117	RAM-110	Corsair Vengeance RGB 64GB DDR5	RAM	20	40	Hardware	1	\N	\N	\N
118	RAM-111	G.Skill Trident Z5 RGB 32GB DDR5	RAM	20	40	Hardware	1	\N	\N	\N
119	SSD-112	Samsung 9100 Pro 4TB	Storage	15	30	Hardware	1	\N	\N	\N
120	SSD-113	WD Black SN8100 2TB	Storage	15	30	Hardware	1	\N	\N	\N
121	HDD-114	Seagate Exos X18 8TB	Storage	10	20	Hardware	1	\N	\N	\N
122	HDD-115	WD Purple Pro 10TB	Storage	10	20	Hardware	1	\N	\N	\N
123	MB-116	ASUS ROG Maximus Z890 Hero	Motherboard	8	15	Hardware	1	\N	\N	\N
124	MB-117	MSI MPG X870E Carbon WiFi	Motherboard	8	15	Hardware	1	\N	\N	\N
125	PSU-118	Corsair RM1000x 1000W Gold	Power Supply	10	20	Hardware	1	\N	\N	\N
126	PSU-119	Cooler Master GX1000 Gold	Power Supply	10	20	Hardware	1	\N	\N	\N
127	CASE-120	Lian Li O11 Dynamic EVO	Cabinet	10	20	Hardware	1	\N	\N	\N
128	CASE-121	NZXT H7 Flow RGB	Cabinet	10	20	Hardware	1	\N	\N	\N
129	MON-122	Samsung Odyssey G5 27 Inch	Monitor	10	20	Hardware	1	\N	\N	\N
130	MON-123	LG UltraGear 32GP850	Monitor	10	20	Hardware	1	\N	\N	\N
131	KEY-124	Logitech G915 Lightspeed	Keyboard	15	30	Hardware	1	\N	\N	\N
132	KEY-125	Keychron Q1 Max	Keyboard	15	30	Hardware	1	\N	\N	\N
133	MOU-126	Logitech G Pro X Superlight 2	Mouse	20	40	Hardware	1	\N	\N	\N
134	MOU-127	Razer Viper V3 Pro	Mouse	20	40	Hardware	1	\N	\N	\N
135	HEAD-128	SteelSeries Arctis Nova Pro	Headset	10	20	Hardware	1	\N	\N	\N
136	WEBCAM-129	Elgato Facecam MK2	Webcam	10	20	Hardware	1	\N	\N	\N
\.


--
-- Data for Name: purchaseorderitems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchaseorderitems (id, purchase_order_id, product_id, quantity, unit_cost, subtotal, received_quantity) FROM stdin;
1	3	1	2	25000.00	50000.00	0
2	3	3	1	25000.00	25000.00	0
\.


--
-- Data for Name: purchaseorders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchaseorders (id, supplier_id, status, created_at, organization_id, unit_cost, total_amount, received_at) FROM stdin;
3	1	PENDING	2026-07-21 13:29:32.521321	1	\N	75000.00	\N
\.


--
-- Data for Name: stockmovements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stockmovements (id, product_id, location_id, type, quantity, "timestamp", user_id, organization_id, order_id) FROM stdin;
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (id, name, contact_info, avg_delivery_date, organization_id) FROM stdin;
1	HP India	hp@hp.com	7	1
2	Lenovo India	lenovo@lenovo.com	4	1
3	ASUS India	asus@asus.com	6	1
4	Samsung	samsung@samsung.com	3	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, role, organization_id, email, password, phone, created_at, updated_at, is_active) FROM stdin;
1	Rishabh	ADMIN	1	rishabh@gmail.com	$2b$10$9epO8QKLREatRMPDE24IsuD3Ji3InlNCvxOY/p86htS61FM03WNG.	9876543210	2026-07-18 11:36:40.240956	2026-07-18 11:36:40.240956	t
4	rishabh	STAFF	\N	harshvardhanroy616@gmail.com	$2b$10$/FvoosLKqBLuB.K7fEY4U.HorIuwYj1WyveUYYYvNzs6qrf1BIzna	8209691627	2026-07-20 11:46:25.095348	2026-07-20 11:46:25.095348	t
7	rishabh	MANAGER	\N	rishabh18sharma3@gmail.com	$2b$10$i/29NxQcdqRqu9MyLzAIFOFudrY0ZDuwfoA/y86SF/ZBsjnx3lTAq	8209691627	2026-07-20 12:08:38.840265	2026-07-20 12:08:38.840265	t
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.warehouses (id, name, address, organization_id) FROM stdin;
4	Warehouse A	Delhi	1
5	Warehouse B	Mumbai	1
6	Warehouse C	Bangalore	1
\.


--
-- Name: bom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bom_id_seq', 1, false);


--
-- Name: bom_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bom_items_id_seq', 1, false);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 131, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 18, true);


--
-- Name: master_material_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_material_id_seq', 1, false);


--
-- Name: orderitems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orderitems_id_seq', 4, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 4, true);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 2, true);


--
-- Name: otp_verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otp_verification_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 187, true);


--
-- Name: purchaseorderitems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchaseorderitems_id_seq', 2, true);


--
-- Name: purchaseorders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchaseorders_id_seq', 3, true);


--
-- Name: stockmovements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stockmovements_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.warehouses_id_seq', 9, true);


--
-- Name: bom_items bom_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom_items
    ADD CONSTRAINT bom_items_pkey PRIMARY KEY (id);


--
-- Name: bom bom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom
    ADD CONSTRAINT bom_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: master_material master_material_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_material
    ADD CONSTRAINT master_material_pkey PRIMARY KEY (id);


--
-- Name: orderitems orderitems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: otp_verification otp_verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_verification
    ADD CONSTRAINT otp_verification_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);


--
-- Name: purchaseorderitems purchaseorderitems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorderitems
    ADD CONSTRAINT purchaseorderitems_pkey PRIMARY KEY (id);


--
-- Name: purchaseorders purchaseorders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorders
    ADD CONSTRAINT purchaseorders_pkey PRIMARY KEY (id);


--
-- Name: stockmovements stockmovements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT stockmovements_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (id);


--
-- Name: idx_inventory_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inventory_org ON public.inventory USING btree (organization_id);


--
-- Name: idx_locations_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_locations_org ON public.locations USING btree (organization_id);


--
-- Name: idx_orderitems_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orderitems_org ON public.orderitems USING btree (organization_id);


--
-- Name: idx_orders_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_org ON public.orders USING btree (organization_id);


--
-- Name: idx_products_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_org ON public.products USING btree (organization_id);


--
-- Name: idx_products_org_sku; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_products_org_sku ON public.products USING btree (organization_id, sku);


--
-- Name: idx_purchaseorders_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchaseorders_org ON public.purchaseorders USING btree (organization_id);


--
-- Name: idx_stockmovements_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_stockmovements_org ON public.stockmovements USING btree (organization_id);


--
-- Name: idx_suppliers_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_suppliers_org ON public.suppliers USING btree (organization_id);


--
-- Name: idx_users_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_org ON public.users USING btree (organization_id);


--
-- Name: idx_warehouses_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_warehouses_org ON public.warehouses USING btree (organization_id);


--
-- Name: bom_items bom_items_bom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom_items
    ADD CONSTRAINT bom_items_bom_id_fkey FOREIGN KEY (bom_id) REFERENCES public.bom(id);


--
-- Name: bom_items bom_items_component_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom_items
    ADD CONSTRAINT bom_items_component_product_id_fkey FOREIGN KEY (component_product_id) REFERENCES public.products(id);


--
-- Name: bom bom_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bom
    ADD CONSTRAINT bom_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders fk_customer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.users(id);


--
-- Name: inventory fk_locations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT fk_locations FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: orderitems fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: inventory fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orderitems fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: stockmovements fk_stock_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT fk_stock_location FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: stockmovements fk_stock_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: stockmovements fk_stock_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT fk_stock_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: purchaseorders fk_supplier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorders
    ADD CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);


--
-- Name: inventory inventory_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: locations locations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: locations locations_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id);


--
-- Name: orderitems orderitems_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: orders orders_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: products products_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: purchaseorderitems purchaseorderitems_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorderitems
    ADD CONSTRAINT purchaseorderitems_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: purchaseorderitems purchaseorderitems_purchase_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorderitems
    ADD CONSTRAINT purchaseorderitems_purchase_order_id_fkey FOREIGN KEY (purchase_order_id) REFERENCES public.purchaseorders(id);


--
-- Name: purchaseorders purchaseorders_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchaseorders
    ADD CONSTRAINT purchaseorders_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: stockmovements stockmovements_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT stockmovements_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: stockmovements stockmovements_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stockmovements
    ADD CONSTRAINT stockmovements_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: suppliers suppliers_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: users users_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: warehouses warehouses_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Ja1fmolfpMgciFavbY3AorTSEb6YjrFFntiJXOEnjB280CKjtmbgVaETTW002mC

