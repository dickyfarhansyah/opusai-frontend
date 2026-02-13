"use client";

import { SchemaFieldCard } from "@/components/dashboard/ai/smartsearch/create/field-create";
import { SchemaGroupCard } from "@/components/dashboard/ai/smartsearch/create/group-create";
import DashboardSmartsearchViewTable from "@/components/dashboard/ai/smartsearch/view-datatable/datatable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useLoadSmartSearchSchemas,
	useSmartSearchSchemaGroups,
} from "@/hooks/useSmartsearch";
import { CircleQuestionMarkIcon, PlusCircleIcon, XIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function DashboardAISmartsearchPage() {
	const loadSchemas = useLoadSmartSearchSchemas();
	const groups = useSmartSearchSchemaGroups();

	useEffect(() => {
		loadSchemas();
	}, [loadSchemas]);

	const groupElements = useMemo(() => {
		return groups.map((group) => {
			return "yahaha"; //placeholder
		});
	}, [groups]);

	return (
		<div className="flex flex-col px-4 py-2">
			<div className="rounded-lg border w-full h-full gap-2 p-4">
				<div className="flex flex-col gap-4">
					<div className="flex gap-2 items-center">
						<h1 className="text-xl">Smartsearch Schema Management</h1>
						<Button variant={"ghost"} size={"icon-sm"} className="h-8 w-8">
							<CircleQuestionMarkIcon className="h-4 w-4" />
						</Button>
					</div>
					<Separator orientation="horizontal" />
					<Tabs defaultValue="schemas" className="w-full">
						<TabsList variant={"line"}>
							<TabsTrigger value="schemas">All Schemas</TabsTrigger>
							<TabsTrigger value="create">Create New</TabsTrigger>
						</TabsList>
						<TabsContent value="schemas">
							<div className="flex flex-col gap-4 py-4">
								<h1 className="text-lg">Existing Schemas</h1>
								<div className="flex flex-col h-48">
									<DashboardSmartsearchViewTable />
								</div>
							</div>
						</TabsContent>
						<TabsContent value="create">
							<div className="flex flex-col gap-4 py-4">
								<div className="flex flex-col gap-2 p-2">
									<SchemaGroupCard />
									<div className="flex flex-col gap-2 ml-8">
										<SchemaFieldCard />
										<SchemaFieldCard />
										<SchemaFieldCard />
										<SchemaFieldCard />
										<SchemaFieldCard />
									</div>
								</div>
								<Button
									variant={"outline"}
									size={"sm"}
									className="w-48 text-xs md:w-56 md:text-base "
								>
									<PlusCircleIcon className="h-4 w-4" /> Create group schema
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
